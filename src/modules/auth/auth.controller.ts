import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { HTTP_STATUS } from '../../constants/global';
import { successResponse } from '../../utils/response';

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body);
      return successResponse(
        res,
        user,
        'Registration successful',
        HTTP_STATUS.CREATED,
      );
    } catch (error) {
      next(error);
    }
  },
};
