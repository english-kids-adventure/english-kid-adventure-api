import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { errorResponse } from '@utils/response';
import { HTTP_STATUS } from '@constants/global';
import { AUTH_MESSAGE } from '@modules/auth/auth.constant';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_ACCESS_SECRET as Secret, (err, decoded) => {
      if (err) return errorResponse(res, AUTH_MESSAGE.TOKEN_EXPIRED, HTTP_STATUS.UNAUTHORIZED);
      req.user = decoded;
      next();
    });
  } else {
    return errorResponse(res, AUTH_MESSAGE.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
  }
};
