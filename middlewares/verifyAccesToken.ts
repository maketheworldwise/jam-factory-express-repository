import { NextFunction, Request, Response } from 'express';
import { SignService } from '../src/main/user/services/SignService';
import { ACCESS_TOKEN_TYPE } from '../src/main/utils/constants';
import { decodeToken } from '../src/main/utils/jwtUtils';
import result from '../src/main/utils/resObject';
import statusCode from '../src/main/utils/resStatusCode';

const signService = new SignService();

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headerInfo.accessToken;
    const jwtPayload: any = await decodeToken(ACCESS_TOKEN_TYPE, accessToken);

    const userId = jwtPayload.userId;
    await signService.verifyTokenUser(userId);

    req.userId = userId;
    next();
  } catch (err: any) {
    return res.status(statusCode.BAD_REQUEST).send(result.fail(err.message));
  }
};

export default verifyAccessToken;
