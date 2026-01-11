import { UserRepository } from './user.repository';
import { JwtPayload } from '@middlewares/auth.middleware';
import { LEADERBOARD_CONFIG, LEADERBOARD_REWARDS, USER_MESSAGE } from './user.constant';
import {
  getStartOfTodayUTC,
  getStartOfCurrentWeekUTC,
  formatDateUTC,
  getDaysDifference,
} from '@utils/date';

export const UserService = {
  async getUserProfile(userPayload: JwtPayload) {
    const userId = Number(userPayload.userId);
    let user = await UserRepository.getProfile(userId);
    if (!user) throw new Error(USER_MESSAGE.USER_NOT_FOUND);

    const today = getStartOfTodayUTC();
    const todayStr = formatDateUTC(today);
    const lastLoginStr = user.lastLoginAt
      ? formatDateUTC(new Date(user.lastLoginAt))
      : null;
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
      if (!user) {
        throw new Error(USER_MESSAGE.USER_NOT_FOUND);
      }
    }
    const weeklyXp = user.weeklyStats[0]?.weeklyXp || 0;
    const completedDays = user.activityLogs.map((log) =>
      new Date(log.activityDate).getUTCDay(),
    );
    return {
      user_id: user.id,
      name: user.name,
      avatar_url: user.avatarUrl,
      total_xp: user.totalXp,
      weekly_xp: weeklyXp,
      total_stars: user.totalStars,
      current_streak: user.currentStreak,
      longest_streak: user.longestStreak,
      completed_days: completedDays,
    };
  },
  async getWeeklyLeaderboard(currentUserId: number) {
    const startOfWeek = getStartOfCurrentWeekUTC();
    const [topStats, currentUserStat] = await Promise.all([
      UserRepository.getWeeklyLeaderboard(LEADERBOARD_CONFIG.TOP_LIMIT),
      UserRepository.getUserRankAndXp(currentUserId, startOfWeek),
    ]);
    const top10 = topStats.map((item, index) => {
      const rank = index + 1;
      const rewardStars = LEADERBOARD_REWARDS[rank as keyof typeof LEADERBOARD_REWARDS] || 0;
      return {
        rank,
        user_id: item.userId,
        name: item.user.name,
        avatar_url: item.user.avatarUrl,
        weekly_xp: item.weeklyXp,
        reward_stars: rewardStars,
        is_me: item.userId === currentUserId,
      };
    });

    return {
      top_10: top10,
      my_rank: {
        rank: currentUserStat.rank,
        weekly_xp: currentUserStat.weeklyXp,
        reward_stars: LEADERBOARD_REWARDS[currentUserStat.rank as keyof typeof LEADERBOARD_REWARDS] || 0,
      },
      reward_rules: LEADERBOARD_REWARDS,
    };
  },
};
