import React, { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { SafeSignerRequest } from '../';

const Signer = ({ walletClient }: {walletClient: any}) => {
  const [request, setRequest] = useState<SafeSignerRequest | null>(null);
  const [response, setResponse] = useState<string>('');
  const socketRef = useRef<Socket | null>(null);  // Use useRef to persist the socket

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io();

      socketRef.current.on('connect', () => {
        console.log('Connected to server');
        socketRef.current?.emit('ready');
      });

      socketRef.current.on('request', (request: SafeSignerRequest) => {
        console.log('Received new request:', request);
        setRequest(request);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;  // Clean up the socket connection on unmount
    };
  }, []);

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

      if (socketRef.current) {
        socketRef.current.emit('signedResponse', response);
        setRequest(null);
        setResponse('');
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
