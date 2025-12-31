import { UserRepository } from './user.repository';
import { JwtPayload } from '@middlewares/auth.middleware';
import { AUTH_MESSAGE } from '@modules/auth/auth.constant';

export const UserService = {
  async getUserProfile(userPayload: JwtPayload | undefined) {
    if (!userPayload) {
      throw new Error(AUTH_MESSAGE.UNAUTHORIZED);
    }
    const userId = Number(userPayload.userId);
    const user = await UserRepository.getProfile(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const weeklyXp = user.weeklyStats[0]?.weeklyXp || 0;

    return {
      user_id: user.id,
      name: user.name,
      avatar_url: user.avatarUrl,
      total_xp: user.totalXp,
      weekly_xp: weeklyXp,
      total_stars: user.totalStars,
      current_streak: user.currentStreak,
      longest_streak: user.longestStreak,
    };
  },
};
