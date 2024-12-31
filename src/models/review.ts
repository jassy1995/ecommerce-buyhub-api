import mongoose from 'mongoose';
import Product from '../models/product';

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const product = await Product.findById(this.productId);
      if (!product) return next();
      const newNumberOfReviews = product.numReviews + 1;
      const newAverageRating =
        (product.rating * product.numReviews + this.rating) / newNumberOfReviews;
      await Product.findByIdAndUpdate(this.productId, {
        rating: Number(newAverageRating.toFixed(2)),
        numReviews: newNumberOfReviews,
      });
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

schema.pre('deleteOne', { document: true }, async function (next: any) {
  try {
    const product = await Product.findById(this.productId);
    if (!product) return next();
    const newNumberOfReviews = product.numReviews - 1;
    const newAverageRating =
      newNumberOfReviews === 0
        ? 0
        : (product.rating * product.numReviews - this.rating) / newNumberOfReviews;
    await Product.findByIdAndUpdate(this.productId, {
      rating: Number(newAverageRating.toFixed(2)),
      numReviews: newNumberOfReviews,
    });
    next();
  } catch (error: any) {
    next(error);
  }
});

const Review = mongoose.model('Review', schema);

export default Review;
