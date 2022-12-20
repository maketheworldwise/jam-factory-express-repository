import express from 'express';
import productCartRouter from './productCartRouter';
import productPurchaseRouter from './productPurchaseRouter';
import productReviewRouter from './productReviewRouter';
import productRouter from './productRouter';
import signRouter from './signRouter';

const router = express.Router();

router.use('/', signRouter);
router.use('/product', productRouter);
router.use('/cart', productCartRouter);
router.use('/purchase', productPurchaseRouter);
router.use('/review', productReviewRouter);

export default router;
