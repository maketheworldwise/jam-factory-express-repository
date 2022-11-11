import { Request, Response } from 'express';
import {
  ACCESS_TOKEN_TYPE,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_TYPE,
} from '../../utils/constants';
import { getAccessToken } from '../../utils/jwtUtils';
import message from '../../utils/resMessage';
import result from '../../utils/resObject';
import statusCode from '../../utils/resStatusCode';
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
   * @param {Request} req (*nickname, *password, *phone, *birth, zipCode, addressMain, addressSub, email)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async signUp(req: Request, res: Response) {
    const reqDto: SignUpReqDto = req.body;

    try {
      const userId = await signService.signUp(reqDto);

      return res
        .status(statusCode.CREATED)
        .send(result.success(message.SIGN_UP_SUCCESS, { userId }));
    } catch (err) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(result.fail(message.INTERNAL_SERVER_ERROR));
    }
  }

  /**
   * 로그인 : [POST] http://localhost:8080/sign-in
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (nickname, password)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async signIn(req: Request, res: Response) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const device = req.headers['user-agent'] || 'web';
    const reqDto: SignInReqDto = req.body;

    try {
      const { accessToken, refreshToken } = await signService.signIn(
        ip,
        device,
        reqDto
      );
      res.cookie(
        REFRESH_TOKEN_TYPE,
        refreshToken,
        REFRESH_TOKEN_COOKIE_OPTIONS
      );

      return res
        .status(statusCode.OK)
        .send(result.success(message.SIGN_IN_SUCCESS, { accessToken }));
    } catch (err: any) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(result.fail(err.message));
    }
  }

  /**
   * Access 토큰 검증 : [POST] http://localhost:8080/verify-access-token
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (authorization)
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async verifyAccessToken(req: Request, res: Response) {
    try {
      const accessToken = getAccessToken(req.headers.authorization);
      const jwtPayload = await signService.verifyToken(
        ACCESS_TOKEN_TYPE,
        accessToken
      );

      return res
        .status(statusCode.OK)
        .send(result.success(message.VALIDATE_TOKEN_SUCCESS, jwtPayload));
    } catch (err: any) {
      console.log(err.message);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(result.fail(err.message));
    }
  }

  // 토큰 재발급 (자동 로그인)
  // 로그아웃시 토큰 데이터 삭제
}
