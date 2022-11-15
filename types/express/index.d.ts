import express from 'express';
import { HeaderInfoReqDto } from '../../src/main/domains/user/models/dtos/HeaderInfoReqDto';

declare global {
  namespace Express {
    interface Request {
      headerInfo: HeaderInfoReqDto;
      userId: number;
    }
  }
}
