import { prisma } from '@config/prisma';

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
};
