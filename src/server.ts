import express, { Express } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import next from 'next';
import path from 'path'
import { SafeSignerRequest, SafeSignerOptions } from '.';
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

    socket.on('response', (response: string) => {
      io.emit('response', response);
    });

    socket.on('request', (request: SafeSignerRequest, options: SafeSignerOptions = {}) => {
      io.emit('request', request, options);
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
