import { Request, Response } from 'express';
import result from '../src/main/utils/resObject';
import statusCode from '../src/main/utils/resStatusCode';

const asyncHandler = (fn: any) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (err: any) {
      return res.status(err.code).send(result.fail(err.message));
    }
  };
};

export default asyncHandler;
