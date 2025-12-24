import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '@utils/response';
import { ZodError } from 'zod';
import { HTTP_STATUS, RESPONSE_MESSAGE } from '@constants/global';

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

    return errorResponse(res, issues, HTTP_STATUS.BAD_REQUEST);
  }
  if (err instanceof Error) {
    return errorResponse(res, err.message, HTTP_STATUS.BAD_REQUEST);
  }

  return errorResponse(
    res,
    RESPONSE_MESSAGE.SOMETHING_WENT_WRONG,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
  );
};
