import cron from 'node-cron';
import { prisma } from '@config/prisma';
import { getStartOfCurrentWeekVN } from '@utils/date';
import { MISSION_CODE } from '../mission/mission.constant';
import { CRON_SCHEDULE } from './user.constant';

export const UserCron = {
  init() {
    cron.schedule(CRON_SCHEDULE.WEEKLY_LEADERBOARD_FINALIZATION, async () => {
      await this.finalizeWeeklyLeaderboard();
    });
    cron.schedule(CRON_SCHEDULE.WEEKLY_AUTO_CLAIM_REWARDS, async () => {
      await this.autoClaimPreviousWeekRewards();
    });
  },

  async autoClaimPreviousWeekRewards() {
    const thisMonday = getStartOfCurrentWeekVN();
    const lastMonday = new Date(thisMonday);
    lastMonday.setUTCDate(lastMonday.getUTCDate() - 7);

    const pendingClaims = await prisma.userMissionProgress.findMany({
      where: {
        resetDate: lastMonday,
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
    const startOfWeek = getStartOfCurrentWeekVN();
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
  },
};
