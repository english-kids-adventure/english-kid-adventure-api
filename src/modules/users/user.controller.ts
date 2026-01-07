import { NextFunction, Response } from 'express';
import { AuthRequest } from '@middlewares/auth.middleware';
import { UserService } from './user.service';
import { successResponse } from '@utils/response';
import { HTTP_STATUS } from '@constants/global';
import { USER_MESSAGE } from './user.constant';
import { AUTH_MESSAGE } from '@modules/auth/auth.constant';

export const UserController = {
  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return next(new Error(AUTH_MESSAGE.UNAUTHORIZED));
      }
      const profile = await UserService.getUserProfile(req.user);
      return successResponse(
        res,
        profile,
        USER_MESSAGE.GET_PROFILE_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },
};
