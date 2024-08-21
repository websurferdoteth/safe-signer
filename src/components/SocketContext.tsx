import React, { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { SafeSignerRequest } from '..';
import WalletContext from './WalletContext';

const SocketContext = () => {
  const [request, setRequest] = useState<SafeSignerRequest | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    console.log('SocketContainer Reflow occurred');
    if (!socketRef.current) {
      socketRef.current = io();

      socketRef.current.on('connect', () => {
        console.log('Connected to server');
        socketRef.current?.emit('ready');
      });

      socketRef.current.on('request', (newRequest) => { setRequest(newRequest); });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from server');
        // window.close();
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <div>
      {socketRef.current && request &&
        <WalletContext socket={socketRef.current} request={request} />
      }
    </div>
  );
};

export default SocketContext;