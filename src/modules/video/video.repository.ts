import { prisma } from '@common/config/prisma';

export const VideoRepository = {
  async getVideoById(videoId: number) {
    return await prisma.video.findUnique({
      where: { id: videoId },
    });
  },

  async updateVideoProgress(userId: number, videoId: number) {
    return prisma.userVideoProgress.upsert({
      where: {
        userId_videoId: { userId, videoId },
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        userId,
        videoId,
        isCompleted: true,
        isUnlocked: true,
        completedAt: new Date(),
      },
    });
  },

  async awardUserXp(userId: number, xpAmount: number) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        totalXp: { increment: xpAmount },
      },
    });
  },

  async getUserVideoProgress(userId: number, videoId: number) {
    return prisma.userVideoProgress.findUnique({
      where: {
        userId_videoId: { userId, videoId },
      },
    });
  },
};
