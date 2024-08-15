import React, { useEffect, useState } from 'react';

interface LogEntry {
  method: string;
  url: string;
  timestamp: string;
}

const Signer = ({ walletClient }: {walletClient: any}) => {
  const [requests, setRequests] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Assume your separate server is running on port 5000
    const eventSource = new EventSource('http://localhost:5000/api/sse');

    eventSource.onmessage = (event: MessageEvent) => {
      const newRequest: LogEntry = JSON.parse(event.data);
      setRequests((prevRequests) => [...prevRequests, newRequest]);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const signRequest = async (req: LogEntry) => {
    if (!walletClient) {
      console.error('Wallet client not available');
      return;
    }

    try {
      const response = await walletClient.signMessage({
        message: req.url,
      });
  
      console.log('Signed message:', response);
    } catch (error) {
      console.error('Failed to sign message:', error);
    }
  };

  useEffect(() => {
    if (walletClient) {
      requests.forEach((req) => {
        signRequest(req);
      });
    }
  }, [requests]);

  return (
    <div>
      <h2>Received Requests</h2>
      <ul>
        {requests.map((req, index) => (
          <li key={index}>
            {req.method} {req.url} - {req.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Signer;