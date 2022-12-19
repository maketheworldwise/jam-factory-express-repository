import express from 'express';
import asyncWrapper from '../middlewares/asyncWrapper';
import setHeaderInfoInReq from '../middlewares/setHeaderInfoInReq';
import verifyAccessToken from '../middlewares/verifyAccesToken';
import { ProductCartController } from '../src/main/domains/product/controllers/ProductCartController';

const productCartRouter = express.Router();
const productCartController = new ProductCartController();

productCartRouter.post(
  '/product/:productId',
  setHeaderInfoInReq,
  verifyAccessToken,
  asyncWrapper(productCartController.postProductCart)
);

export default productCartRouter;
