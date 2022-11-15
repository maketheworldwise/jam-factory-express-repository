import { NextFunction, Request, Response } from 'express';
import { HeaderInfoReqDto } from '../src/main/user/models/dtos/HeaderInfoReqDto';
import { getAccessToken, getRefreshToken } from '../src/main/utils/jwtUtils';
import message from '../src/main/utils/resMessage';
import result from '../src/main/utils/resObject';
import statusCode from '../src/main/utils/resStatusCode';

const setHeaderInfoInReq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const device = req.headers['user-agent'] || 'web';
    const accessToken = getAccessToken(req.headers.authorization) || '';
    if (accessToken === undefined) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(result.fail(message.TOKEN_NOT_EXIST_ERROR));
    }

    const refreshToken =
      getRefreshToken(req.cookies) ||
      req.headers.cookie?.toString().split(';')[0].split('=')[1] ||
      '';

    const headerInfo: HeaderInfoReqDto = {
      ip,
      device,
      accessToken,
      refreshToken,
    };

    req.headerInfo = headerInfo;
    next();
  } catch (err: any) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(result.fail(err.message));
  }
};

export default setHeaderInfoInReq;
