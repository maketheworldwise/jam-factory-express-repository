import { Request, Response } from 'express';
import UserInfoRequestException from '../../../exceptions/user/UserInfoRequestException';
import {
  REFRESH_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_TYPE,
} from '../../../utils/constants';
import message from '../../../utils/resMessage';
import result from '../../../utils/resObject';
import statusCode from '../../../utils/resStatusCode';
import { HeaderInfoReqDto } from '../models/dtos/HeaderInfoReqDto';
import { SignInReqDto } from '../models/dtos/SignInReqDto';
import { SignUpReqDto } from '../models/dtos/SignUpReqDto';
import { SignService } from '../services/SignService';

const signService = new SignService();

export class SignController {
  /**
   * 회원가입
   * [POST] http://localhost:8080/sign-up
   *
   * @version 0.0.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*nickname, *password, *phone, *birth, zipCode, addressMain, addressSub, *email)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async signUp(req: Request, res: Response) {
    const reqBodyDto: SignUpReqDto = req.body;

    const userId: number = await signService.signUp(reqBodyDto);

    return res
      .status(statusCode.CREATED)
      .send(result.success(message.SIGN_UP_SUCCESS, { userId }));
  }

  /**
   * 로그인
   * [POST] http://localhost:8080/sign-in
   *
   * @version 0.1.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*nickname, *password)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async signIn(req: Request, res: Response) {
    const reqHeaderDto: HeaderInfoReqDto = req.headerInfo;
    const reqBodyDto: SignInReqDto = req.body;

    if (!reqBodyDto.nickname || !reqBodyDto.password) {
      throw new UserInfoRequestException(message.USER_INFO_REQUEST_ERROR);
    }

    const { accessToken, refreshToken } = await signService.signIn(
      reqHeaderDto,
      reqBodyDto
    );

    res.clearCookie;
    res.cookie(REFRESH_TOKEN_TYPE, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

    return res
      .status(statusCode.OK)
      .send(result.success(message.SIGN_IN_SUCCESS, { accessToken }));
  }

  /**
   * 로그아웃
   * [POST] http://localhost:8080/sign-out
   *
   * @version 0.0.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization, *cookie)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async signOut(req: Request, res: Response) {
    const reqHeaderDto: HeaderInfoReqDto = req.headerInfo;

    await signService.signOut(reqHeaderDto);

    res.clearCookie;

    return res
      .status(statusCode.NO_CONTENT)
      .send(result.success(message.SIGN_OUT_SUCCESS));
  }

  /**
   * 아이디 중복 확인
   * [GET] http://localhost:8080/verify-nickname/:nickname
   *
   * @version 0.1.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*nickname)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async verifyNickname(req: Request, res: Response) {
    const nickname: string = req.params.nickname;
    if (!nickname || nickname.trim() === '') {
      throw new UserInfoRequestException(message.USER_INFO_REQUEST_ERROR);
    }

    await signService.verifyNickname(nickname);

    return res
      .status(statusCode.OK)
      .send(result.success(message.VERIFY_NICKNAME_SUCCESS));
  }

  /**
   * Access 토큰 검증
   * [POST] http://localhost:8080/verify-access-token
   *
   * @version 0.0.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async verifyAccessToken(req: Request, res: Response) {
    const userId: number = req.userId;

    return res
      .status(statusCode.OK)
      .send(result.success(message.VALIDATE_TOKEN_SUCCESS, { userId }));
  }

  /**
   * 토큰 재발급 (자동 로그인)
   * [POST] http://localhost:8080/reissue-token
   *
   * @version 0.1.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization, *cookie)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async reissueToken(req: Request, res: Response) {
    const reqHeaderDto: HeaderInfoReqDto = req.headerInfo;

    const jwtPayload: any = await signService.verifyRefreshToken(
      reqHeaderDto.refreshToken
    );

    const userId: number = jwtPayload.userId;

    const { accessToken, refreshToken } = await signService.reissueToken(
      userId,
      reqHeaderDto
    );

    res.clearCookie;
    res.cookie(REFRESH_TOKEN_TYPE, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

    return res
      .status(statusCode.CREATED)
      .send(result.success(message.SIGN_IN_SUCCESS, { accessToken }));
  }
}
