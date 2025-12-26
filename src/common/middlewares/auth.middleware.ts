import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { errorResponse } from '@utils/response';
import { HTTP_STATUS } from '@constants/global';
import { AUTH_MESSAGE } from '@modules/auth/auth.constant';
export interface JwtPayload {
  userId: string | number;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return errorResponse(
      res,
      AUTH_MESSAGE.UNAUTHORIZED,
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  const token = authHeader.split(' ')[1];

  const accessSecret: Secret =
    process.env.JWT_ACCESS_SECRET || 'default_access_secret';

  jwt.verify(token, accessSecret, (err, decoded) => {
    if (err) {
      return errorResponse(
        res,
        AUTH_MESSAGE.TOKEN_EXPIRED,
        HTTP_STATUS.UNAUTHORIZED,
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
