import React, { useEffect, useState, useRef, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import { SafeSignerRequest } from '..';
import Signer from './Signer';
import { getChain, compareChains } from '../utils/chains';

const SocketContext = ({ walletClient }: {walletClient: any}) => {
  const [request, setRequest] = useState<SafeSignerRequest | null>(null);
  const [isCorrectChain, setIsCorrectChain] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const handleRequest = useCallback(async (newRequest: SafeSignerRequest) => {
    console.log('Received new request:', newRequest);
    const requestChain = getChain(newRequest.network);
    if (!requestChain) {
      console.error('Invalid network:', newRequest.network);
      throw new Error('Unsupported network');
    }
    const chainId = requestChain.id;
    const currentChainId = walletClient.chain.id;

    if (!compareChains(currentChainId, chainId)) {
      try {
        await walletClient.switchChain({ id: chainId });
        setIsCorrectChain(true);
      } catch (error) {
        console.error('Failed to switch chain:', error);
        setIsCorrectChain(false);
        return;
      }
    } else {
      setIsCorrectChain(true);
    }

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

  if (socketRef.current && request && isCorrectChain) {
    return (
      <Signer walletClient={walletClient} socket={socketRef.current} request={request} />
    );
  }
  return null;
};

export default SocketContext;