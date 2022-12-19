import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import cookieParser from 'cookie-parser';
import logger from './middlewares/logger';

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(routes);
  app.use(cors());
  app.use(morgan('combined'));
  app.use(cookieParser());
  app.use(logger);
  app.use('/data', express.static('data'));

  return app;
};

export default createApp;
