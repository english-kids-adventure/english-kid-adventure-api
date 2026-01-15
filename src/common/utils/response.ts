import { Response } from 'express';
export const successResponse = <T>(
  res: Response,
  data: T,
  message = '',
  statusCode: number,
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

export const errorResponse = <T>(
  res: Response,
  error: T,
  statusCode: number,
) => {
  return res.status(statusCode).json({
    success: false,
    error,
  });
};
