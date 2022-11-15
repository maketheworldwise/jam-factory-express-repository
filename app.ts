import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import cookieParser from 'cookie-parser';

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(routes);
  app.use(cors());
  app.use(morgan('combined'));
  app.use(cookieParser());

  return app;
};

export default createApp;
