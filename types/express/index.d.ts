import express from 'express';
import { PagingInfoReqDto } from '../../src/main/domains/product/models/dtos/PagingInfoReqDto';
import { HeaderInfoReqDto } from '../../src/main/domains/user/models/dtos/HeaderInfoReqDto';

declare global {
  namespace Express {
    interface Request {
      headerInfo: HeaderInfoReqDto;
      pagingInfo: PagingInfoReqDto;
      userId: number;
    }
  }
}
