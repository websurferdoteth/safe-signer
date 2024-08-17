import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import next from 'next';
import path from 'path'
import { SafeSignerRequest } from '.';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: path.join(__dirname, '../'), customServer: true });
const nextHandler = nextApp.getRequestHandler();

export async function startServer(port: number = 3000): Promise<http.Server> {
  await nextApp.prepare();

  const app = express();
  const server = http.createServer(app);
  const io = new SocketIOServer(server);

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

  app.all('*', (req, res) => {
    return nextHandler(req, res);
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
      resolve(server);
    });
  });
}
