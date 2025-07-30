import { NextFunction, Request, Response } from 'express';
import AppError from '../util/AppError';

const errorMiddleware = (err: Error | AppError, req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error Middleware]', err);
  const statusCode = (err instanceof AppError && err.statusCode) || 500
  // note: we just get message from AppError erro, if it's Error instance we use default message
  // example: req.body is not a function, so i will not return this to front end casue this realted to backend server error
  const message = (err instanceof AppError && err.message) || 'Internal Server Error'
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
