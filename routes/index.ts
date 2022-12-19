import express from 'express';
import productRouter from './productRouter';
import signRouter from './signRouter';

const router = express.Router();

router.use('/', signRouter);
router.use('/product', productRouter);

export default router;
