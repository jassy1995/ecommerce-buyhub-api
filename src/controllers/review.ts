import { NextFunction, Request, Response } from 'express';
import ReviewService from '../services/review';
import UserService from '../services/user';
import ProductService from '../services/product';

const ReviewController = {
  async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, productId } = req.params;
      const { comment, rating } = req.body;
      console.log('pr', req.params);
      const payload = { userId, productId, comment, rating };
      const user = await UserService.getOne({ _id: userId }, { returnPassword: false });
      if (!user) return res.status(404).send({ success: false, message: 'User not found' });
      const product = await ProductService.getOne({ _id: productId });
      if (!product) return res.status(404).send({ success: false, message: 'Product not found' });
      const reviews = await ReviewService.create(payload);
      return res.status(200).json({ success: true, reviews });
    } catch (error: any) {
      return next(error);
    }
  },
  async getReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const reviews = await ReviewService.getAll(req.query);
      return res.status(200).json({ success: true, reviews });
    } catch (error: any) {
      return next(error);
    }
  },
  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const review = await ReviewService.deleteOne({ _id: req.params.reviewId });
      return res.status(200).json({ success: true, review });
    } catch (error: any) {
      return next(error);
    }
  },
};

export default ReviewController;
