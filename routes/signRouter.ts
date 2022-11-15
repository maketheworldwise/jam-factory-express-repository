import express from 'express';
import asyncHandler from '../middlewares/asyncWrapper';
import setHeaderInfoInReq from '../middlewares/setHeaderInfoInReq';
import verifyAccessToken from '../middlewares/verifyAccesToken';
import { SignController } from '../src/main/domains/user/controllers/SignController';

const signRouter = express.Router();
const signController = new SignController();

signRouter.post('/sign-up', asyncHandler(signController.signUp));
signRouter.post(
  '/sign-in',
  setHeaderInfoInReq,
  asyncHandler(signController.signIn)
);
signRouter.post(
  '/verify-access-token',
  setHeaderInfoInReq,
  verifyAccessToken,
  asyncHandler(signController.verifyAccessToken)
);
signRouter.post(
  '/reissue-token',
  setHeaderInfoInReq,
  asyncHandler(signController.reissueToken)
);

export default signRouter;
