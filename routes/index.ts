import express from 'express';
import productCartRouter from './productCartRouter';
import productRouter from './productRouter';
import signRouter from './signRouter';

const router = express.Router();

router.use('/', signRouter);
router.use('/product', productRouter);
router.use('/cart', productCartRouter);

export default router;
