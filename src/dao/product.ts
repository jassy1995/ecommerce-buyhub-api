import Product from '../models/product';
import mongoose, { isValidObjectId } from 'mongoose';

const ProductDao = {
  async getNewArrivals({ limit = 5 }: any) {
    return Product.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: +limit,
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'productId',
          as: 'reviews',
        },
      },
      {
        $project: {
          name: 1,
          slug: 1,
          image: 1,
          brand: 1,
          category: 1,
          description: 1,
          price: 1,
          count: 1,
          rating: 1,
          numReviews: 1,
          sizes: 1,
          style: 1,
          createdAt: 1,
          reviews: 1,
        },
      },
    ]);
  },
  async getOne(args: any) {
    if (args._id && !isValidObjectId(args._id)) return null;
    return Product.findOne(args);
  },
  async getTopSelling({ limit = 5 }: any) {
    return Product.aggregate([
      {
        $sort: { createdAt: 1 },
      },
      {
        $limit: +limit,
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'productId',
          as: 'reviews',
        },
      },
      {
        $project: {
          name: 1,
          slug: 1,
          image: 1,
          brand: 1,
          category: 1,
          description: 1,
          price: 1,
          count: 1,
          rating: 1,
          numReviews: 1,
          sizes: 1,
          style: 1,
          createdAt: 1,
          reviews: 1,
        },
      },
    ]);
    /* const oneMonthAgo:any = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return mongoose.connection.db.collection('orders').aggregate([
        {
          $match: {
            createdAt: { $gte: oneMonthAgo },
          },
        },
        {
          $unwind: '$orderItems',
        },
        {
          $group: {
            _id: '$orderItems.product',
            totalQuantity: { $sum: '$orderItems.quantity' },
          },
        },
        {
          $sort: { totalQuantity: -1 },
        },
        {
          $limit: +limit,
        },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        {
          $unwind: '$productDetails',
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $project: {
            totalQuantity: 1,
            productDetails: 1,
            reviews: 1,
          },
        },
      ]).toArray(); */
  },
  async getProductById(productId: string) {
    if (!isValidObjectId(productId)) return null;
    const product = await Product.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(productId) },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'productId',
          as: 'reviews',
        },
      },
      {
        $unwind: {
          path: '$reviews',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'reviews.userId',
          foreignField: '_id',
          as: 'reviews.user',
        },
      },
      {
        $unwind: {
          path: '$reviews.user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          slug: { $first: '$slug' },
          image: { $first: '$image' },
          brand: { $first: '$brand' },
          category: { $first: '$category' },
          description: { $first: '$description' },
          price: { $first: '$price' },
          count: { $first: '$count' },
          rating: { $first: '$rating' },
          numReviews: { $first: '$numReviews' },
          sizes: { $first: '$sizes' },
          style: { $first: '$style' },
          createdAt: { $first: '$createdAt' },
          reviews: {
            $push: {
              $cond: [{ $eq: ['$reviews', {}] }, null, '$reviews'],
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          slug: 1,
          image: 1,
          brand: 1,
          category: 1,
          description: 1,
          price: 1,
          count: 1,
          rating: 1,
          numReviews: 1,
          sizes: 1,
          style: 1,
          createdAt: 1,
          reviews: {
            $filter: {
              input: '$reviews',
              as: 'review',
              cond: { $ne: ['$$review', null] },
            },
          },
        },
      },
    ]);
    return product.length > 0 ? product[0] : null;
  },
  async getProductsByName({ productId, productName }: any) {
    if (!isValidObjectId(productId)) return null;
    return Product.aggregate([
      {
        $match: {
          name: { $regex: `\\b${productName.split(/\s+/).join('\\b|\\b')}\\b`, $options: 'i' },
          _id: { $ne: new mongoose.Types.ObjectId(productId.toString()) },
        },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'productId',
          as: 'reviews',
        },
      },
      {
        $unwind: {
          path: '$reviews',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'reviews.userId',
          foreignField: '_id',
          as: 'reviews.user',
        },
      },
      {
        $unwind: {
          path: '$reviews.user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          slug: { $first: '$slug' },
          image: { $first: '$image' },
          brand: { $first: '$brand' },
          category: { $first: '$category' },
          description: { $first: '$description' },
          price: { $first: '$price' },
          count: { $first: '$count' },
          rating: { $first: '$rating' },
          numReviews: { $first: '$numReviews' },
          sizes: { $first: '$sizes' },
          style: { $first: '$style' },
          createdAt: { $first: '$createdAt' },
          reviews: {
            $push: {
              $cond: [{ $eq: ['$reviews', {}] }, null, '$reviews'],
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          slug: 1,
          image: 1,
          brand: 1,
          category: 1,
          description: 1,
          price: 1,
          count: 1,
          rating: 1,
          numReviews: 1,
          sizes: 1,
          style: 1,
          createdAt: 1,
          reviews: {
            $filter: {
              input: '$reviews',
              as: 'review',
              cond: { $ne: ['$$review', null] },
            },
          },
        },
      },
      {
        $limit: 4,
      },
    ]);
  },
};

export default ProductDao;
