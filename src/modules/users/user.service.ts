// src/modules/users/user.service.ts
import { UserRepository } from './user.repository';
import { JwtPayload } from '@middlewares/auth.middleware';
import { AUTH_MESSAGE } from '@modules/auth/auth.constant';
import { USER_MESSAGE } from './user.constant';
import {
  getStartOfTodayUTC,
  getStartOfCurrentWeekUTC,
  formatDateUTC,
  getDaysDifference,
} from '@utils/date';

export const UserService = {
  async getUserProfile(userPayload: JwtPayload | undefined) {
    if (!userPayload) throw new Error(AUTH_MESSAGE.UNAUTHORIZED);

    const userId = Number(userPayload.userId);
    let user = await UserRepository.getProfile(userId);
    if (!user) throw new Error(USER_MESSAGE.USER_NOT_FOUND);

    const today = getStartOfTodayUTC();
    const todayStr = formatDateUTC(today);
    const lastLoginStr = user.lastLoginAt ? formatDateUTC(new Date(user.lastLoginAt)) : null;
    if (!lastLoginStr || todayStr > lastLoginStr) {
      let newStreak = 1;

      if (lastLoginStr) {
        const lastLoginDate = new Date(lastLoginStr);
        const daysDiff = getDaysDifference(today, lastLoginDate);

        if (daysDiff === 1) {
          newStreak = user.currentStreak + 1;
        }
      }
      const newLongestStreak = Math.max(newStreak, user.longestStreak);
      const startOfWeek = getStartOfCurrentWeekUTC();
      await Promise.all([
        UserRepository.updateUserStats(userId, {
          totalXp: { increment: 10 },
          currentStreak: newStreak,
          longestStreak: newLongestStreak,
          lastLoginAt: new Date(),
          streakUpdatedAt: today,
        }),
        UserRepository.createActivityLog(userId, today),
        UserRepository.addWeeklyXp(userId, startOfWeek, 10),
      ]);
      user = await UserRepository.getProfile(userId);
    }
    const weeklyXp = user!.weeklyStats[0]?.weeklyXp || 0;
    const completedDays = user!.activityLogs.map((log) =>
      new Date(log.activityDate).getUTCDay(),
    );

    return {
      user_id: user!.id,
      name: user!.name,
      avatar_url: user!.avatarUrl,
      total_xp: user!.totalXp,
      weekly_xp: weeklyXp,
      total_stars: user!.totalStars,
      current_streak: user!.currentStreak,
      longest_streak: user!.longestStreak,
      completed_days: completedDays,
    };
  },
};
