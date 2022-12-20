import express from 'express';
import asyncWrapper from '../middlewares/asyncWrapper';
import setHeaderInfoInReq from '../middlewares/setHeaderInfoInReq';
import verifyAccessToken from '../middlewares/verifyAccesToken';
import { ProductReviewController } from '../src/main/domains/product/controllers/ProductReviewController';

const productReviewRouter = express.Router();
const productReviewController = new ProductReviewController();

productReviewRouter.post(
  '/product/:productId',
  setHeaderInfoInReq,
  verifyAccessToken,
  asyncWrapper(productReviewController.postProductReview)
);
productReviewRouter.get(
  '/product/:productId',
  asyncWrapper(productReviewController.getProductReviewList)
);

export default productReviewRouter;
