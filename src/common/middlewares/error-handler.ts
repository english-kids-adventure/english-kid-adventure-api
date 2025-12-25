import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../utils/response';
import { ZodError } from 'zod';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const issues = err.issues.map((e) => ({
      path: e.path[0],
      message: e.message,
    }));

    return errorResponse(res, issues, 400);
  }
  if (err instanceof Error) {
    return errorResponse(res, err.message, 400);
  }

  return errorResponse(res, 'Something went wrong', 400);
};
