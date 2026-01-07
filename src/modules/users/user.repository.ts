import { prisma } from '@config/prisma';
import { getStartOfCurrentWeekUTC } from '@utils/date';

export const UserRepository = {
  async getProfile(userId: number) {
    const startOfWeek = getStartOfCurrentWeekUTC();

    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        weeklyStats: {
          where: { weekStartDate: startOfWeek },
          select: { weeklyXp: true },
          take: 1,
        },
        activityLogs: {
          where: { activityDate: { gte: startOfWeek } },
          select: { activityDate: true },
        },
      },
    });
  },

  async updateUserStats(userId: number, data: UserUpdateData) {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  },

  async createActivityLog(userId: number, date: Date) {
    return await prisma.userActivityLog.upsert({
      where: {
        userId_activityDate: { userId, activityDate: date },
      },
      update: {},
      create: { userId, activityDate: date },
    });
  },

  async addWeeklyXp(userId: number, startOfWeek: Date, xpToAdd: number) {
    return await prisma.userWeeklyStat.upsert({
      where: {
        userId_weekStartDate: { userId, weekStartDate: startOfWeek },
      },
      update: { weeklyXp: { increment: xpToAdd } },
      create: { userId, weekStartDate: startOfWeek, weeklyXp: xpToAdd },
    });
  },
};
