import { Response } from 'express';

export const successResponse = (res: Response, data: any): Response =>
  res.json({ status: 'success', data });

export const errorResponse = (res: Response, message: string, statusCode = 500): Response =>
  res.status(statusCode).json({
    status: 'error',
    message,
  });
