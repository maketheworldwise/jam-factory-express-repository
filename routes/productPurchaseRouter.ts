import express from 'express';
import asyncWrapper from '../middlewares/asyncWrapper';
import setHeaderInfoInReq from '../middlewares/setHeaderInfoInReq';
import verifyAccessToken from '../middlewares/verifyAccesToken';
import { ProductPurchaseController } from '../src/main/domains/product/controllers/ProductPurchaseController';

const productPurchaseRouter = express.Router();
const productPurchaseController = new ProductPurchaseController();

productPurchaseRouter.post(
  '/product',
  setHeaderInfoInReq,
  verifyAccessToken,
  asyncWrapper(productPurchaseController.postProductPurchase)
);

export default productPurchaseRouter;
