import React, { useEffect, useState, useRef, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import { SafeSignerRequest } from '..';
import Signer from './Signer';
import { useWalletClient } from 'wagmi';

const SocketContext = () => {
  const { data: walletClient } = useWalletClient();
  const [request, setRequest] = useState<SafeSignerRequest | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const handleRequest = useCallback(async (newRequest: SafeSignerRequest) => {
    console.log('Received new request:', newRequest);
    setRequest(newRequest);
  }, [walletClient]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io();

      socketRef.current.on('connect', () => {
        console.log('Connected to server');
        socketRef.current?.emit('ready');
      });

      socketRef.current.on('request', handleRequest);

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [handleRequest]);

  if (socketRef.current && request) {
    return (
      <Signer socket={socketRef.current} request={request} />
    );
  }
  return null;
};

export default SocketContext;