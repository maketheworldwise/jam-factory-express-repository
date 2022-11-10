import express from 'express';
import { SignController } from '../src/main/user/controllers/SignController';

const signRouter = express.Router();
const signController = new SignController();

signRouter.post('/sign-up', signController.signUp);
signRouter.post('/sign-in', signController.signIn);

export default signRouter;
