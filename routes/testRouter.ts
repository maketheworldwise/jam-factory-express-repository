import express from 'express';
import { TestController } from '../src/main/controllers/TestController';

const testRouter = express.Router();
const testController = new TestController();

testRouter.post('/', testController.createTest);
testRouter.get('/', testController.readTest);

export default testRouter;
