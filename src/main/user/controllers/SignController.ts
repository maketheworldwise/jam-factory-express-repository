import { Request, Response } from 'express';
import {
  REFRESH_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_TYPE,
} from '../../utils/constants';
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
   * @param {Request} req
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async signUp(req: Request, res: Response) {
    const reqDto: SignUpReqDto = req.body;

    try {
      const queryResult = await signService.signUp(reqDto);

      return res
        .status(statusCode.CREATED)
        .send(result.success(message.CREATE_USER_SUCCESS, queryResult));
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
   * @param {Request} req
   * @param {Response} res
   * @return {*}
   * @memberof SignController
   */
  public async signIn(req: Request, res: Response) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const device = req.headers['user-agent'];
    const reqDto: SignInReqDto = req.body;

    try {
      const { access_token, refresh_token } = await signService.signIn(
        ip,
        device,
        reqDto
      );
      res.cookie(
        REFRESH_TOKEN_TYPE,
        refresh_token,
        REFRESH_TOKEN_COOKIE_OPTIONS
      );

      return res
        .status(statusCode.OK)
        .send(result.success(message.CREATE_TOKEN_SUCCESS, { access_token }));
    } catch (err: any) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(result.fail(err.message));
    }
  }
}
