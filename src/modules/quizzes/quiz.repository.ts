import { prisma } from '@config/prisma';
import { getStartOfTodayVN } from '@utils/date';

export const QuizRepository = {
  async findQuizByVideoId(videoId: number) {
    return await prisma.quizQuestion.findMany({
      where: { videoId },
      include: {
        answers: true,
      },
    });
  },

  async findVideoById(id: number) {
    return await prisma.video.findUnique({ where: { id } });
  },

  async getToDayAttempt(userId: number, videoId: number) {
    const today = getStartOfTodayVN();

    return await prisma.userQuizAttempt.findUnique({
      where: {
        userId_videoId_attemptDate: {
          userId,
          videoId,
          attemptDate: today,
        },
      },
    });
  },

  async incrementUserTotalStars(userId: number, starsToAward: number) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        totalStars: { increment: starsToAward },
      },
    });
  },

  async upsertQuizAttempt(
    userId: number,
    videoId: number,
    starsToAward: number,
  ) {
    const today = getStartOfTodayVN();

    return await prisma.userQuizAttempt.upsert({
      where: {
        userId_videoId_attemptDate: { userId, videoId, attemptDate: today },
      },
      update: {
        timesPlayed: { increment: 1 },
        dailyStarsEarned: { increment: starsToAward },
      },
      create: {
        userId,
        videoId,
        attemptDate: today,
        timesPlayed: 1,
        dailyStarsEarned: starsToAward,
      },
    });
  },

  async getUserTotalStars(userId: number) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: { totalStars: true },
    });
  },

  async incrementAttemptOnly(userId: number, videoId: number) {
    const today = getStartOfTodayVN();

    return await prisma.userQuizAttempt.upsert({
      where: {
        userId_videoId_attemptDate: { userId, videoId, attemptDate: today },
      },
      update: {
        timesPlayed: { increment: 1 },
      },
      create: {
        userId,
        videoId,
        attemptDate: today,
        timesPlayed: 1,
        dailyStarsEarned: 0,
      },
    });
  },

  async findQuizAtemptByVideoId(userId: number, videoId: number) {
    return await prisma.userQuizAttempt.findMany({
      where: { userId, videoId },
    });
  },
};
