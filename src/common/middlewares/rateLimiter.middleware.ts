import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '@utils/response';
import redis from '@config/redis';
import { AUTH_MESSAGE } from '@modules/auth/auth.constants';
import { HTTP_STATUS } from '@constants/global';

interface RateLimitRule {
  limit: number;
  windowTime: number;
}

export const rateLimiter = (rule: RateLimitRule) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ip = req.ip;
      const key = `rate-limit:${req.path}:${ip}`;

      const requests = await redis.incr(key);

      if (requests === 1) {
        await redis.expire(key, rule.windowTime);
      }

      if (requests > rule.limit) {
        return errorResponse(
          res,
          AUTH_MESSAGE.MANY_REQUEST,
          HTTP_STATUS.TOO_MANY_REQUESTS,
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

redis.on('error', (err) => {
  console.error('Redis error:', err);
});
