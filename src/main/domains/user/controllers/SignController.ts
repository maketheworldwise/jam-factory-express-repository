import { Request, Response } from 'express';
import {
  REFRESH_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_TYPE,
} from '../../../utils/constants';
import message from '../../../utils/resMessage';
import result from '../../../utils/resObject';
import statusCode from '../../../utils/resStatusCode';
import { SignInReqDto } from '../models/dtos/SignInReqDto';
import { SignUpReqDto } from '../models/dtos/SignUpReqDto';
import { SignService } from '../services/SignService';

const signService = new SignService();

export class SignController {
  /**
   * 회원가입 : [POST] http://localhost:8080/sign-up
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*nickname, *password, *phone, *birth, zipCode, addressMain, addressSub, *email)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async signUp(req: Request, res: Response) {
    const reqBodyDto: SignUpReqDto = req.body;
    const userId = await signService.signUp(reqBodyDto);

    return res
      .status(statusCode.CREATED)
      .send(result.success(message.SIGN_UP_SUCCESS, { userId }));
  }

  /**
   * 로그인 : [POST] http://localhost:8080/sign-in
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*nickname, *password)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async signIn(req: Request, res: Response) {
    const reqHeaderDto = req.headerInfo;
    const reqBodyDto: SignInReqDto = req.body;

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
   * 로그아웃 : [POST] http://localhost:8080/sign-out
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization, *cookie)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async signOut(req: Request, res: Response) {
    const reqHeaderDto = req.headerInfo;
    await signService.signOut(reqHeaderDto);

    res.clearCookie;
    return res
      .status(statusCode.NO_CONTENT)
      .send(result.success(message.SIGN_OUT_SUCCESS));
  }

  /**
   * Nickname 검증 : [GET] http://localhost:8080/verify-nickname/:nickname
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*nickname)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async verifyNickname(req: Request, res: Response) {
    const { nickname } = req.params;
    await signService.verifyNickname(nickname);

    return res
      .status(statusCode.OK)
      .send(result.success(message.VERIFY_NICKNAME_SUCCESS));
  }

  /**
   * Access 토큰 검증 : [POST] http://localhost:8080/verify-access-token
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async verifyAccessToken(req: Request, res: Response) {
    const userId = req.userId;

    return res
      .status(statusCode.OK)
      .send(result.success(message.VALIDATE_TOKEN_SUCCESS, { userId }));
  }

  /**
   * 토큰 재발급 (자동 로그인) : [POST] http://localhost:8080/reissue-token
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization, *cookie)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async reissueToken(req: Request, res: Response) {
    const reqHeaderDto = req.headerInfo;
    const jwtPayload: any = await signService.verifyRefreshToken(
      reqHeaderDto.refreshToken
    );
    const userId = jwtPayload.userId;
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
