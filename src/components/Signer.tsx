import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { SafeSignerRequest } from '../';

const Signer = ({ walletClient, socket, request }: {walletClient: any, socket: Socket, request: SafeSignerRequest}) => {

  const handleRequest = async (req: SafeSignerRequest) => {
    if (!walletClient) {
      console.error('Wallet client not available');
      return;
    }

    try {
      let response;
      if (req.type === 'transaction') {
        response = await walletClient.signTransaction(req.data);
      } else if (req.type === 'EIP712Message') {
        response = await walletClient.signTypedData(req.data);
      } else if (req.type === 'message') {
        response = await walletClient.signMessage(req.data);
      }

      if (socket) {
        socket.emit('signedResponse', response);
      }
      console.log('Signed message:', response);
    } catch (error) {
      console.error('Failed to sign message:', error);
    }
  };

  useEffect(() => {
    console.log(request);
    if (walletClient && request) {
      handleRequest(request);
    }
  }, [request]);

  return (
    <div>
      <h2>Received Requests</h2>
      <ul>
        {request && <li key={JSON.stringify(request)}>{JSON.stringify(request)}</li>}
      </ul>
    </div>
  );
};

export default Signer;
