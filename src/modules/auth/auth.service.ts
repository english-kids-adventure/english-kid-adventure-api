import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import redis from '@config/redis';
import { AUTH_MESSAGE } from './auth.constant';
import { AuthRepository } from './auth.repository';
import { LoginDTO, RegisterDTO, TokenPayload } from './auth.type';
import bcrypt from 'bcrypt';
export const AuthService = {
  async register(dto: RegisterDTO) {
    const isUserExists = await AuthRepository.findByEmail(dto.email);
    if (isUserExists) {
      throw new Error(AUTH_MESSAGE.EMAIL_EXISTS);
    }
    const hashPassword = await bcrypt.hash(dto.password, 10);

    const user = await AuthRepository.createUser({
      name: dto.name,
      email: dto.email,
      password: hashPassword,
    });
    return user;
  },
  async generateTokens(payload: TokenPayload) {
    const accessSecret =
      (process.env.JWT_ACCESS_SECRET as Secret) || 'default_access_secret';
    const refreshSecret =
      (process.env.JWT_REFRESH_SECRET as Secret) || 'default_refresh_secret';

    const accessOptions: SignOptions = {
      expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN as any) || '15m',
    };

    const refreshOptions: SignOptions = {
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN as any) || '7d',
    };

    const accessToken = jwt.sign({ ...payload }, accessSecret, accessOptions);
    const refreshToken = jwt.sign(
      { ...payload },
      refreshSecret,
      refreshOptions,
    );

    await redis.set(
      `refresh_token:${payload.userId}`,
      refreshToken,
      'EX',
      7 * 24 * 60 * 60,
    );

    return { accessToken, refreshToken };
  },

  async login(dto: LoginDTO) {
    const user = await AuthRepository.findByEmail(dto.email);
    if (!user || !user.password)
      throw new Error(AUTH_MESSAGE.INVALID_CREDENTIALS);

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new Error(AUTH_MESSAGE.INVALID_CREDENTIALS);

    const tokens = await this.generateTokens({
      userId: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      ...tokens,
    };
  },

  async refreshToken(token: string) {
    try {
      const refreshSecret = process.env.JWT_REFRESH_SECRET as Secret;
      const decoded = jwt.verify(token, refreshSecret) as TokenPayload;

      const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
      if (storedToken !== token) throw new Error(AUTH_MESSAGE.TOKEN_INVALID);

      return await this.generateTokens({
        userId: decoded.userId,
        email: decoded.email,
      });
    } catch (error) {
      throw new Error(AUTH_MESSAGE.TOKEN_INVALID);
    }
  },

  async logout(userId: number) {
    await redis.del(`refresh_token:${userId}`);
  },
};
