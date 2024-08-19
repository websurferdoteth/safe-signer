import { startServer } from './server';
import { io, Socket } from 'socket.io-client';
import open from 'open';
import { SignMessageParameters, SignTypedDataParameters, TransactionRequest } from 'viem';

export interface SafeSignerRequest {
  type: 'message' | 'EIP712Message' | 'transaction' | 'switchChain';
  data: SignMessageParameters | SignTypedDataParameters | TransactionRequest | { network: string | number};
}

class SafeSigner {
  private socket!: Socket;
  private server: any;
  private clientReady: boolean = false;

  constructor(private port: number = 3000) { }

  async start(): Promise<void> {

    const { server, app, nextHandler } = await startServer(this.port);
    this.server = server;

    this.socket = io(`http://localhost:${this.port}`);

    this.socket.on('clientReady', () => {
      console.log('SafeSigner: Client is ready');
      this.clientReady = true;
    });

    this.socket.on('clientDisconnected', () => {
      console.log('SafeSigner: Client disconnected');
      this.clientReady = false;
    });

    // Defining routes here so we have access to the class methods
    app.post('/api/submit-request', (req, res) => {
      const request: SafeSignerRequest = req.body;
      console.log('API request received:', request);

      // Wait for the response and send it back to the client
      this.sendRequest(request).then((response) => {
        res.json({ response });
      }).catch((error) => {
        res.status(500).json({ error: error.message });
      });
    });

    // New endpoint for checking client status
    app.get('/api/client-status', (req, res) => {
      const clientConnected = this.clientReady;
      res.json({ clientConnected });
    });

    app.get('/api/stop', (req, res) => {
      this.stop();
      res.json({ message: 'Server stopped' });
    });

    app.all('*', (req, res) => {
      return nextHandler(req, res);
    });

  }

  async sendRequest(request: SafeSignerRequest): Promise<string> {
    await open(`http://localhost:${this.port}`, { wait: true, background: true});
    return new Promise((resolve) => {
      // Wait until the client is ready
      const checkReady = setInterval(() => {
        if (this.clientReady) {
          clearInterval(checkReady);
          this.socket.emit('request', request);
          this.socket.once('signedResponse', resolve);
        }
      }, 100); // Check every 100ms
    });
  }

  stop(): void {
    if (this.server) {
      this.server.close();
    }
    if (this.socket) {
      this.socket.disconnect();
    }
    process.exit(0);
  }
}

export default SafeSigner;