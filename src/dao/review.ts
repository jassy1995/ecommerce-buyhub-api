import Review from '../models/review';
import { CreateReviewBody } from '../schemas/review';
import { isValidObjectId } from 'mongoose';

const ReviewDao = {
  async create(data: CreateReviewBody) {
    return Review.create(data);
  },
  async getAll({ limit = 20 }: any) {
    return Review.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      { $sort: { createdAt: -1 } },
      { $limit: +limit },
    ]);
  },
  async getOne(args: any) {
    return Review.findOne(args);
  },
  async deleteOne(args: any) {
    if (args._id && !isValidObjectId(args._id)) return null;
    return Review.deleteOne(args);
  },
};

export default ReviewDao;
