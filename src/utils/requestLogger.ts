import { NextApiRequest } from 'next';

interface LogEntry {
  method: string;
  url: string;
  timestamp: string;
}

export async function logRequest(req: NextApiRequest) {
  const logEntry: LogEntry = {
    method: req.method || 'UNKNOWN',
    url: req.url || 'UNKNOWN',
    timestamp: new Date().toISOString(),
  };

  try {
    // Assume your separate server is running on port 5000
    const response = await fetch('http://localhost:5000/log-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logEntry),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Request logged successfully');
  } catch (error) {
    console.error('Failed to log request:', error);
  }
}