import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { spawn } from 'child_process';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const port = 5000;

// Start the Next.js app
// const nextApp = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });

io.on('connection', (socket) => {
  console.log('WebSocket client connected');

  socket.on('userResponse', (response) => {
    console.log('Received user response:', response);
    // Process the response as needed
  });
});

app.use(express.json());

app.post('/get-signature', (req, res) => {
  const question = req.body.question;
  io.emit('newQuestion', question);
  res.json({ message: 'Question sent' });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});