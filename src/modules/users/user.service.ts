import { UserRepository } from './user.repository';

export const UserService = {
  async getUserProfile(userId: number) {
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
