import express from 'express';
import asyncWrapper from '../middlewares/asyncWrapper';
import setPagingInfoInReq from '../middlewares/setPagingInfoInReq';
import { ProductController } from '../src/main/domains/product/controllers/ProductControllers';

const productRouter = express.Router();
const productController = new ProductController();

productRouter.get(
  '/',
  setPagingInfoInReq,
  asyncWrapper(productController.getProductList)
);
productRouter.get('/:productId', asyncWrapper(productController.getProduct));

export default productRouter;
