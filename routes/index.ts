import express from 'express';
import testRouter from './testRouter';

const router = express.Router();

router.use('/test', testRouter);

export default router;
