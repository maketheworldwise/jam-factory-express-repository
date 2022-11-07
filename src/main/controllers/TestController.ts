import { Request, Response } from 'express';
import { TestService } from '../services/TestService';

const testService = new TestService();

export class TestController {
  public async createTest(req: Request, res: Response) {
    const { content } = req.body;

    try {
      await testService.createTest(content);
      return res.status(201).json({ message: 'createTest' });
    } catch {
      return res.status(400).json({ message: 'error' });
    }
  }

  public async readTest(req: Request, res: Response) {
    try {
      const data = await testService.readTest();
      return res.status(200).json({ result: data });
    } catch {
      return res.status(400).json({ message: 'error' });
    }
  }
}
