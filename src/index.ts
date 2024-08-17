import { startServer } from './server';
import { io, Socket } from 'socket.io-client';
import open from 'open';
import { SignMessageParameters, SignTypedDataParameters, TransactionRequest } from 'viem';

export interface SafeSignerRequest {
  network: string;
  type: 'message' | 'EIP712Message' | 'transaction';
  data: SignMessageParameters | SignTypedDataParameters | TransactionRequest;
}

class SafeSigner {
  private socket!: Socket;
  private server: any;
  private clientReady: boolean = false;

  constructor(private port: number = 3000) { }

  async start(): Promise<void> {

    this.server = await startServer(this.port);
    this.socket = io(`http://localhost:${this.port}`);

    this.socket.on('clientReady', () => {
      console.log('SafeSigner: Client is ready');
      this.clientReady = true;
    });

    this.socket.on('clientDisconnected', () => {
      console.log('SafeSigner: Client disconnected');
      this.clientReady = false;
    });

    await open(`http://localhost:${this.port}`);

  }

  async sendRequest(request: SafeSignerRequest): Promise<string> {
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
  }
}

export default SafeSigner;