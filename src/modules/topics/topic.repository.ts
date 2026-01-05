import { prisma } from '@config/prisma';

export const TopicRepository = {
  async findAllTopicsById(userId: number, limit: number, offset: number) {
    const [topics, total] = await Promise.all([
      prisma.topic.findMany({
        where: { isActive: true },
        take: limit,
        skip: offset,
        orderBy: { id: 'asc' },
        include: {
          _count: {
            select: { videos: true },
          },
          videos: {
            select: { duration: true },
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
      }),
      prisma.topic.count({ where: { isActive: true } }),
    ]);

    return { topics, total };
  },

  async findVideosByTopicId(topicId: number, userId: number) {
    return await prisma.video.findMany({
      where: { topicId },
      include: {
        userProgress: {
          where: {
            userId,
          },
          select: {
            isUnlocked: true,
            isCompleted: true,
          },
        },
      },
      orderBy: { orderIndex: 'asc' },
    });
  },

  async findTopicById(id: number) {
    return await prisma.topic.findUnique({
      where: { id },
    });
  },
};
