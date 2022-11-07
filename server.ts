import http from 'http';
import { Request, Response } from 'express';

import createApp from './app';
import 'dotenv/config';

const app = createApp();

app.get('/ping', (_: Request, res: Response) => {
  res.status(200).json({ message: 'pong' });
});

const server = http.createServer(app);
const serverPort = process.env.APPLICATION_SERVER_PORT;

server.listen(serverPort, () => {
  console.log('Server is running on port: ', serverPort);
});
