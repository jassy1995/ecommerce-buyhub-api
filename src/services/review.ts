import ReviewDao from '../dao/review';
import { CreateReviewBody } from '../schemas/review';

const ReviewService = {
  async create(data: CreateReviewBody) {
    return ReviewDao.create(data);
  },
  async getAll(params: any) {
    return await ReviewDao.getAll(params);
  },
  async deleteOne(params: any) {
    return await ReviewDao.deleteOne(params);
  },
};

export default ReviewService;
