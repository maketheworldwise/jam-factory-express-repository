import express from 'express';
import signRouter from './signRouter';

const router = express.Router();

router.use('/', signRouter);

export default router;
