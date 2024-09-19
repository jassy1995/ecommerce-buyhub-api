import { SignUpBody } from '../schemas/auth';
import User from '../models/user';
import { isValidObjectId } from 'mongoose';

const UserDao = {
  async create(
    user: Omit<SignUpBody, 'password' | 'phone'> & {
      googleId?: string;
      facebookId?: string;
      twitterId?: string;
    }
  ) {
    return User.create(user);
  },
  async getAll({ status, type, role, search, page = 1, limit = 20 }: any) {
    const params: any = {};
    if (status) params.status = status;
    if (role) params.role = role;
    if (type) params.type = type;
    if (search) {
      params.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { middleName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }
    const skip = page * limit - limit;
    return User.find(params).limit(limit).skip(skip).exec();
  },
  getCount({ search, role, status, type }: any = {}) {
    const params: any = {};
    if (status) params.status = status;
    if (role) params.role = role;
    if (type) params.type = type;
    if (search) {
      params.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { middleName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }
    return User.countDocuments(params).exec();
  },
  async getOne(args: any, options?: { returnPassword: boolean }) {
    if (args._id && !isValidObjectId(args._id)) return null;
    const builder = User.findOne(args);
    if (options?.returnPassword) builder.select('+password');
    return builder;
  },
  async update(id: string, data: any) {
    if (!isValidObjectId(id)) return null;
    return User.findByIdAndUpdate(id, data, { new: true });
  },
  async delete(id: string) {
    if (!isValidObjectId(id)) return null;
    return User.findOneAndDelete({ _id: id });
  },
};

export default UserDao;
