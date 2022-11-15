import { NextFunction, Request, Response } from 'express';

const logger = async (req: Request, _: Response, next: NextFunction) => {
  // console.log('headers: ', req.headers);
  // console.log('body: ', req.body);

  next();
};

export default logger;
