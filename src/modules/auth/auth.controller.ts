import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { HTTP_STATUS } from '@constants/global';
import { successResponse } from '@common/utils/response';
import { AUTH_MESSAGE } from './auth.constant';

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body);
      return successResponse(
        res,
        user,
        AUTH_MESSAGE.REGISTER_SUCCESS,
        HTTP_STATUS.CREATED,
      );
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await AuthService.login(
        req.body,
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return successResponse(
        res,
        { user, accessToken },
        AUTH_MESSAGE.LOGIN_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.refreshToken;
      const { accessToken, refreshToken: newRefresh } =
        await AuthService.refreshToken(token);

      res.cookie('refreshToken', newRefresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return successResponse(
        res,
        { accessToken },
        AUTH_MESSAGE.REFRESH_TOKEN_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (refreshToken) {
        await AuthService.logoutByToken(refreshToken);
      }
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      return successResponse(
        res,
        null,
        AUTH_MESSAGE.LOGOUT_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },
};
