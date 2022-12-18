import express from 'express';
import asyncHandler from '../middlewares/asyncWrapper';
import encryptPasswordReq from '../middlewares/encryptPasswordReq';
import setHeaderInfoInReq from '../middlewares/setHeaderInfoInReq';
import validateSignUpInfoReq from '../middlewares/validateSignUpInfoReq';
import verifyAccessToken from '../middlewares/verifyAccesToken';
import { SignController } from '../src/main/domains/user/controllers/SignController';

const signRouter = express.Router();
const signController = new SignController();

signRouter.post(
  '/sign-up',
  validateSignUpInfoReq,
  encryptPasswordReq,
  asyncHandler(signController.signUp)
);
signRouter.post(
  '/sign-in',
  setHeaderInfoInReq,
  encryptPasswordReq,
  asyncHandler(signController.signIn)
);
signRouter.post(
  '/sign-out',
  setHeaderInfoInReq,
  asyncHandler(signController.signOut)
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
