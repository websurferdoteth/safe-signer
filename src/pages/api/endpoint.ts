// pages/api/endpoint1.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { logRequest } from '../../utils/requestLogger';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  logRequest(req);
  res.status(200).json({ message: 'Endpoint 1 response' });
}