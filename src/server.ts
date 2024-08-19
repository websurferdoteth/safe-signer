import express, { Express } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import next from 'next';
import path from 'path'
import { SafeSignerRequest } from '.';
import { RequestHandler } from 'next/dist/server/next';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: path.join(__dirname, '../'), customServer: true });
const nextHandler = nextApp.getRequestHandler();

export async function startServer(port: number = 3000): Promise<{ server: http.Server, app: Express, nextHandler: RequestHandler }> {
  await nextApp.prepare();

  const app = express();
  const server = http.createServer(app);
  const io = new SocketIOServer(server);

  app.use(express.json());

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('ready', () => {
      console.log('Client is ready');
      io.emit('clientReady');
    });

    socket.on('signedResponse', (response: string) => {
      io.emit('signedResponse', response);
    });

    socket.on('request', (request: SafeSignerRequest) => {
      console.log('Question received on server:', request);
      io.emit('request', request);
    });

    socket.on('disconnect', () => {
      io.emit('clientDisconnected');
    });
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
      resolve({server, app, nextHandler});
    });
  });
}
