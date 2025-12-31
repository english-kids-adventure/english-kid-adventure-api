import { NextFunction, Response } from 'express';
import { AuthRequest } from '@middlewares/auth.middleware';
import { UserService } from './user.service';
import { successResponse } from '@utils/response';
import { HTTP_STATUS } from '@constants/global';
import { USER_MESSAGE } from './user.constant';

export const UserController = {
  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
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
