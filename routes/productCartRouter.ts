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
productCartRouter.get(
  '/product',
  setHeaderInfoInReq,
  verifyAccessToken,
  asyncWrapper(productCartController.getProductCartList)
);
productCartRouter.patch(
  '/product/:productId',
  setHeaderInfoInReq,
  verifyAccessToken,
  asyncWrapper(productCartController.patchProductCart)
);
productCartRouter.delete(
  '/:productCartId',
  setHeaderInfoInReq,
  verifyAccessToken,
  asyncWrapper(productCartController.deleteProductCart)
);

export default productCartRouter;
