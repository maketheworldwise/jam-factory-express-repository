import express from 'express';
import setHeaderInfoInReq from '../middlewares/setHeaderInfoInReq';
import { SignController } from '../src/main/user/controllers/SignController';

const signRouter = express.Router();
const signController = new SignController();

signRouter.post('/sign-up', signController.signUp);
signRouter.post('/sign-in', setHeaderInfoInReq, signController.signIn);
signRouter.post(
  '/verify-access-token',
  setHeaderInfoInReq,
  signController.verifyAccessToken
);
signRouter.post(
  '/reissue-token',
  setHeaderInfoInReq,
  signController.reissueToken
);

export default signRouter;
