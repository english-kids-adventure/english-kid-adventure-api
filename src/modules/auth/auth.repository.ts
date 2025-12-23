import { prisma } from '../../config/prisma';
import { RegisterDTO } from './auth.type';

export const AuthRepository = {
  async createUser(data: RegisterDTO) {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  },

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  },
};
