import logger from '../lib/logger';
import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    shortName: { type: String, required: true },
  },
  {
    timestamps: false,
  }
);

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    numReviews: {
      type: Number,
      required: true,
    },
    image_id: {
      type: String,
    },
    sizes: [sizeSchema],
    style: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', schema);

Product.syncIndexes().catch((e: any) => logger.error(e));

export default Product;
