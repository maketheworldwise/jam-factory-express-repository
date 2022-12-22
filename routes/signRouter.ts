import express from 'express';
import asyncWrapper from '../middlewares/asyncWrapper';
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
  asyncWrapper(signController.signUp)
);
signRouter.post(
  '/sign-in',
  setHeaderInfoInReq,
  asyncWrapper(signController.signIn)
);
signRouter.post(
  '/sign-out',
  setHeaderInfoInReq,
  asyncWrapper(signController.signOut)
);
signRouter.get(
  '/verify-nickname/:nickname',
  asyncWrapper(signController.verifyNickname)
);
signRouter.post(
  '/verify-access-token',
  setHeaderInfoInReq,
  verifyAccessToken,
  asyncWrapper(signController.verifyAccessToken)
);
signRouter.post(
  '/reissue-token',
  setHeaderInfoInReq,
  asyncWrapper(signController.reissueToken)
);

export default signRouter;
