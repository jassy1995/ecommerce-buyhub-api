import express from 'express';
import ReviewController from '../controllers/review';
import validate from '../middlewares/validate';
import { createReviewSchema, deleteReviewSchema } from '../schemas/review';

const router = express.Router();

router.get('/latest', ReviewController.getReviews);
router.post(
  '/comment/product/:productId/user/:userId',
  validate(createReviewSchema),
  ReviewController.createReview
);
router.delete('/comment/:reviewId', validate(deleteReviewSchema), ReviewController.deleteReview);

export default router;
