import { prisma } from '@config/prisma';

export const TopicRepository = {
  async findAllTopicsById(userId: number, limit: number, cursor?: number) {
    return await prisma.topic.findMany({
      where: { isActive: true },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: 'asc' },
      include: {
        _count: {
          select: { videos: true },
        },
        videos: {
          where: {
            userProgress: {
              some: {
                userId,
                isCompleted: true,
              },
            },
          },
        },
      },
    });
  },

  async findVideosByTopicId(topicId: number) {
    return await prisma.video.findMany({
      where: { topicId },
      orderBy: { orderIndex: 'asc' },
    });
  },

  async findTopicById(id: number) {
    return await prisma.topic.findUnique({
      where: { id },
    });
  },
};
