import cron from 'node-cron';
import { prisma } from '@config/prisma';
import { getStartOfCurrentWeekUTC } from '@utils/date';
import { MISSION_CODE } from '../mission/mission.constant';

export const UserCron = {
  init() {
    cron.schedule('59 23 * * 0', async () => {
      await this.finalizeWeeklyLeaderboard();
    });
  },
  async finalizeWeeklyLeaderboard() {
    const startOfWeek = getStartOfCurrentWeekUTC();
    try {
      const topUsers = await prisma.userWeeklyStat.findMany({
        where: { weekStartDate: startOfWeek },
        orderBy: { weeklyXp: 'desc' },
        take: 3,
      });

      if (topUsers.length === 0) return;
      const rankToMissionCode: Record<number, string> = {
        1: MISSION_CODE.WEEKLY_TOP_1,
        2: MISSION_CODE.WEEKLY_TOP_2,
        3: MISSION_CODE.WEEKLY_TOP_3,
      };

      await prisma.$transaction(async (tx) => {
        for (let i = 0; i < topUsers.length; i++) {
          const stats = topUsers[i];
          const rank = i + 1;
          const missionCode = rankToMissionCode[rank];
          const mission = await tx.mission.findUnique({
            where: { code: missionCode },
          });

          if (mission) {
            await tx.userMissionProgress.upsert({
              where: {
                userId_missionId_resetDate: {
                  userId: stats.userId,
                  missionId: mission.id,
                  resetDate: startOfWeek,
                },
              },
              update: { currentCount: 1 },
              create: {
                userId: stats.userId,
                missionId: mission.id,
                currentCount: 1,
                isClaimed: false,
                resetDate: startOfWeek,
              },
            });
            await tx.userWeeklyStat.update({
              where: { id: stats.id },
              data: { finalRank: rank },
            });
          }
        }
      });
    } catch (error) {
      console.error('Error when finalizing the rankings:', error);
    }
  },
};
