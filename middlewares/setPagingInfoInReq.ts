import { NextFunction, Request, Response } from 'express';
import { PagingInfoReqDto } from '../src/main/domains/product/models/dtos/PagingInfoReqDto';
import result from '../src/main/utils/resObject';
import statusCode from '../src/main/utils/resStatusCode';

const setPagingInfoInReq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.query.page ? req.query.page : 0;
    const size = req.query.size ? req.query.size : 12;

    const pagingInfo: PagingInfoReqDto = {
      page,
      size,
    };

    req.pagingInfo = pagingInfo;
    next();
  } catch (err: any) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(result.fail(err.message));
  }
};

export default setPagingInfoInReq;
