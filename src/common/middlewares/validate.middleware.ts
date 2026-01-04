import { ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
