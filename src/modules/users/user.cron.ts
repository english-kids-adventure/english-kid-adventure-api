import cron from 'node-cron';
import { prisma } from '@config/prisma';
import { getStartOfCurrentWeekUTC } from '@utils/date';
import { MISSION_CODE } from '../mission/mission.constant';
import { CRON_SCHEDULE } from './user.constant';

export const UserCron = {
  init() {
    cron.schedule(CRON_SCHEDULE.WEEKLY_REWARD_CLAIM, async () => {
      await this.autoClaimWeeklyRewards();
    });
    cron.schedule(CRON_SCHEDULE.WEEKLY_LEADERBOARD_FINALIZATION, async () => {
      await this.finalizeWeeklyLeaderboard();
    });
  },

  async autoClaimWeeklyRewards() {
    const startOfWeek = getStartOfCurrentWeekUTC();

    const pendingClaims = await prisma.userMissionProgress.findMany({
      where: {
        resetDate: startOfWeek,
        isClaimed: false,
        mission: { type: 'WEEKLY' },
        currentCount: { gte: 1 },
      },
      include: { mission: true },
    });

    if (pendingClaims.length === 0) return;

    await prisma.$transaction(async (tx) => {
      for (const progress of pendingClaims) {
        await tx.userMissionProgress.update({
          where: { id: progress.id },
          data: { isClaimed: true },
        });
        await tx.user.update({
          where: { id: progress.userId },
          data: {
            totalStars: { increment: progress.mission.rewardStars },
          },
        });
      }
    });
  },

  async finalizeWeeklyLeaderboard() {
    const startOfWeek = getStartOfCurrentWeekUTC();
    const nextMonday = new Date(startOfWeek);
    nextMonday.setUTCDate(nextMonday.getUTCDate() + 7);

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
                resetDate: nextMonday,
              },
            },
            update: { currentCount: 1 },
            create: {
              userId: stats.userId,
              missionId: mission.id,
              currentCount: 1,
              isClaimed: false,
              resetDate: nextMonday,
            },
          });

          await tx.userWeeklyStat.update({
            where: { id: stats.id },
            data: { finalRank: rank },
          });
        }
      }
    });
  },
};
