import { AUTH_MESSAGE } from './auth.constants';
import { AuthRepository } from './auth.repository';
import { RegisterDTO } from './auth.type';
import bcrypt from 'bcrypt';
export const AuthService = {
  async register(dto: RegisterDTO) {
    const isUserExists = await AuthRepository.findByEmail(dto.email);
    if (isUserExists) {
      throw new Error(AUTH_MESSAGE.EMAIL_EXISTS);
    }
    const hashPassword = await bcrypt.hash(dto.password, 10);

    const user = await AuthRepository.createUser({
      name: dto.name,
      email: dto.email,
      password: hashPassword,
    });

    return user;
  },
};
