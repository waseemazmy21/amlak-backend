import { Request, Response } from 'express';

const errorMiddleware = (err: unknown, req: Request, res: Response) => {
  console.error('[Error]', err);
  res.status(500).json({ message: 'Internal Server Error' });
};

export default errorMiddleware;
