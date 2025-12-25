import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterSchema } from './auth.schema';
import { HTTP_STATUS } from '../../common/constants/global';

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = RegisterSchema.safeParse(req.body);

      if (!parsed.success) {
        throw parsed.error;
      }

      const user = await AuthService.register(req.body);
      return res.status(HTTP_STATUS.OK).json(user);
    } catch (error) {
      next(error);
    }
  },

  async login() {},

  async logout() {},
};
