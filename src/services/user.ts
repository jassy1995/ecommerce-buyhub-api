import UserDao from '../dao/user';
import {
  CreateUserBanBody,
  CreateUserSuspensionBody,
  SignUpBody,
  UpdateUserBanBody,
  UpdateUserSuspensionBody,
} from '../schemas/auth';
import FileService from './file';
import { CreateWriterRequestBody, UpdateWriterRequestBody } from '../schemas/user';

const UserService = {
  async create(
    user: Omit<SignUpBody, 'password' | 'phone'> & {
      googleId?: string;
      facebookId?: string;
      twitterId?: string;
      verification?: boolean;
    }
  ) {
    return await UserDao.create(user);
  },
  async getAll(params: any) {
    return await UserDao.getAll(params);
  },
  getCount(args?: any) {
    return UserDao.getCount(args);
  },
  async getOne(args: any, options?: { returnPassword: boolean }) {
    return UserDao.getOne(args, options);
  },
  async update(id: string, data: any) {
    return UserDao.update(id, data);
  },
  async delete(id: string) {
    const user = await UserDao.delete(id);
    if (!user) return null;
    if (user.image) await FileService.delete(user.image);
    return user;
  },
};

export default UserService;
