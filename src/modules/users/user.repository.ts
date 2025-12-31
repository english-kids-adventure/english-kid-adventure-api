import { prisma } from '@config/prisma';

export const UserRepository = {
  async getProfile(userId: number) {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(now.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);

    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        weeklyStats: {
          where: {
            weekStartDate: startOfWeek,
          },
          select: { weeklyXp: true },
          take: 1,
        },
      },
    });
  },
};
