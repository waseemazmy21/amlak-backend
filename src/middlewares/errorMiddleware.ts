import { NextFunction, Request, Response } from 'express';
import AppError from '../util/AppError';

const errorMiddleware = (err: Error | AppError, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = (err instanceof AppError && err.statusCode) || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({ message });
};

export default errorMiddleware;
