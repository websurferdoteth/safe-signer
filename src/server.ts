import express from 'express';
import cors from 'cors';
import { EventEmitter } from 'events';

const app = express();
const port = 5000;
const emitter = new EventEmitter();

app.use(cors());
app.use(express.json());

app.post('/log-request', (req, res) => {
  const logEntry = req.body;
  emitter.emit('newRequest', logEntry);
  res.status(200).json({ message: 'Request logged' });
});

app.get('/api/sse', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const listener = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  emitter.on('newRequest', listener);

  req.on('close', () => {
    emitter.off('newRequest', listener);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});