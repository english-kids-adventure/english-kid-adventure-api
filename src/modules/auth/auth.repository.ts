import { prisma } from '../../common/config/prisma';
import { RegisterDTO } from './auth.type';

export const AuthRepository = {
  async createUser(data: RegisterDTO) {
    return await prisma.user.create({ data });
  },

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  },
};
