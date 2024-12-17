import mongoose from 'mongoose';
import logger from '../lib/logger';

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', schema);

Review.syncIndexes().catch((e: any) => logger.error(e));

export default Review;
