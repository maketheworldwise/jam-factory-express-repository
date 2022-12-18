import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import result from '../src/main/utils/resObject';
import statusCode from '../src/main/utils/resStatusCode';
import { BCRYPT_SALT } from '../src/main/utils/constants';

const encryptPasswordReq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, BCRYPT_SALT);

    next();
  } catch (err: any) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(result.fail(err.message));
  }
};

export default encryptPasswordReq;
