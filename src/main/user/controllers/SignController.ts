import { Request, Response } from 'express';
import message from '../../utils/resMessage';
import result from '../../utils/resObject';
import statusCode from '../../utils/resStatusCode';
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
}
