import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Signer = ({ walletClient }: {walletClient: any}) => {
  const [question, setQuestion] = useState<string | null>(null);
  const [response, setResponse] = useState<string>('');
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initSocket = async () => {
      if (typeof window !== 'undefined') {
        const io = (await import('socket.io-client')).default;
        const newSocket = io('http://localhost:5000');

        if (isMounted) {
          setSocket(newSocket);

          newSocket.on('connect', () => {
            console.log('Connected to server');
          });

          newSocket.on('newQuestion', (receivedQuestion: string) => {
            console.log('Received new question:', receivedQuestion);
            setQuestion(receivedQuestion);
          });

          newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
          });
        }
      }
    };

    initSocket();

    return () => {
      isMounted = false;
      if (socket) socket.disconnect();
    };
  }, []);

  const signRequest = async (req: string) => {
    if (!walletClient) {
      console.error('Wallet client not available');
      return;
    }

    try {
      const response = await walletClient.signMessage({
        message: req,
      });

      if (socket) {
        socket.emit('userResponse', response);
        setQuestion(null);
        setResponse('');
      }
      console.log('Signed message:', response);
    } catch (error) {
      console.error('Failed to sign message:', error);
    }
  };

  useEffect(() => {
    if (walletClient && question) {
        signRequest(question);
    }
  }, [question]);

  return (
    <div>
      <h2>Received Requests</h2>
      <ul>
        {question && (
          <li key={question}>
            {question}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Signer;