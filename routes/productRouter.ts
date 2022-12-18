import express from 'express';
import asyncWrapper from '../middlewares/asyncWrapper';
import { ProductController } from '../src/main/domains/product/controllers/ProductControllers';

const productRouter = express.Router();
const productController = new ProductController();

productRouter.get('/', asyncWrapper(productController.getProductList));

export default productRouter;
