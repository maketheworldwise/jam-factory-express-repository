import express from 'express';
import productCartRouter from './productCartRouter';
import productPurchaseRouter from './productPurchaseRouter';
import productRouter from './productRouter';
import signRouter from './signRouter';

const router = express.Router();

router.use('/', signRouter);
router.use('/product', productRouter);
router.use('/cart', productCartRouter);
router.use('/purchase', productPurchaseRouter);

export default router;
