import { startServer } from './server';
import { io, Socket } from 'socket.io-client';
import open from 'open';
import { SignMessageParameters, SignTypedDataParameters, PrepareTransactionRequestParameters, type Address } from 'viem';
import type { Chain } from 'viem/chains';

type FlexibleTransactionRequest = Omit<PrepareTransactionRequestParameters, 'account' | 'value' | 'gas' | 'gasPrice' | 'maxFeePerGas' | 'maxPriorityFeePerGas' | 'chain'> & {
  value?: bigint | number;
  gas?: bigint | number;
  gasPrice?: bigint | number;
  maxFeePerGas?: bigint | number;
  maxPriorityFeePerGas?: bigint | number;
  chain?: Chain | number;
};

export type SafeSignerOptions = {
  address?: Address;
};

export type SafeSignerRequest =
  | Omit<SignTypedDataParameters, 'account'>
  | Omit<SignMessageParameters, 'account'>
  | FlexibleTransactionRequest;

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
      this.clientReady = true;
    });

    this.socket.on('clientDisconnected', () => {
      this.clientReady = false;
    });

    // Defining routes here so we have access to the class methods
    app.post('/api/submit-request', (req, res) => {
      const { request, options = {} }: { request: SafeSignerRequest, options?: SafeSignerOptions } = req.body;

      // Wait for the response and send it back to the client
      this.sendRequest(request, options).then((response) => {
        res.json(response);
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

    const { default: open } = await import('open');
    await open(`http://localhost:${this.port}`, { background: true});
  }

  async sendRequest(request: SafeSignerRequest, options: SafeSignerOptions = {}): Promise<string> {
    return new Promise((resolve) => {
      // Wait until the client is ready
      const checkReady = setInterval(() => {
        if (this.clientReady) {
          clearInterval(checkReady);
          this.socket.emit('request', request, options);
          this.socket.once('response', resolve);
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
export { SafeSigner };
