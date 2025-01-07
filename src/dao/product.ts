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
  async getFilterableOption() {
    const result = await Product.aggregate([
      {
        $facet: {
          categories: [{ $group: { _id: '$category' } }],
          styles: [{ $group: { _id: '$style' } }],
          brands: [{ $group: { _id: '$brand' } }],
          price: [
            {
              $group: {
                _id: null,
                max: { $max: '$price' },
                min: { $min: '$price' },
              },
            },
            {
              $project: { _id: 0, max: 1, min: 1 },
            },
          ],
        },
      },
    ]);

    const [data] = result;
    return {
      categories: data.categories.map((category: any) => category._id),
      styles: data.styles.map((style: any) => style._id),
      brand: data.brands.map((brand: any) => brand._id),
      price: data.price[0] || { max: null, min: null },
    };
  },
  /* async getSearchProducts(args: any) {
    const {
      pageSize = 1,
      page = 1,
      category = "",
      brand = "",
      style = "",
      price = "",
      rating = "",
      order = "",
      query: searchQuery = "",
    } = args;

    const matchFilter = {
      ...(searchQuery && searchQuery !== "all" && { name: { $regex: searchQuery, $options: "i" } }),
      ...(category && category !== "any" && { category }),
      ...(brand && brand !== "any" && { brand }),
      ...(style && style !== "any" && { style }),
      ...(rating && rating !== "any" && { rating: { $gte: Number(rating) } }),
      ...(price && price !== "any" && price.includes("-") && {
        price: {
          $gte: Number(price.split("-")[0]),
          $lte: Number(price.split("-")[1]),
        },
      }),
    };

    const sortOrder: any =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
          ? { price: -1 }
          : order === "toprated"
            ? { rating: -1 }
            : order === "newest"
              ? { createdAt: -1 }
              : { _id: 1 };

    if (page > 1) {
      const skipCount = (page - 1) * pageSize;
      const productsToSkip = await Product.find(matchFilter)
        .sort(sortOrder)
        .limit(skipCount)
        .select("_id");

      if (productsToSkip.length > 0) {
        matchFilter._id = { $gt: productsToSkip[productsToSkip.length - 1]._id };
      }
    }
    const products = await Product.find(matchFilter)
      .sort(sortOrder)
      .limit(pageSize);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {_id, ...countParams} = matchFilter;

    const countProducts = await Product.countDocuments(page > 1 ? countParams : matchFilter);
    const pages = Math.ceil(countProducts / pageSize)

    return {
      products,
      hasNextPage: page < pages,
      pages,
    };
  } */

  async getSearchProducts(args: any) {
    const {
      pageSize = 10,
      page = 1,
      cursor: lastId = null,
      category = '',
      brand = '',
      style = '',
      price = '',
      rating = '',
      order = '',
      query: searchQuery = '',
    } = args;

    const parsedRating = Number(rating);
    const priceRange = price.includes('-') ? price.split('-').map(Number) : null;

    const matchFilter: any = {
      ...(searchQuery && searchQuery !== 'all' && { name: { $regex: searchQuery, $options: 'i' } }),
      ...(category && category !== 'any' && { category }),
      ...(brand && brand !== 'any' && { brand }),
      ...(style && style !== 'any' && { style }),
      ...(parsedRating && !isNaN(parsedRating) && { rating: { $gte: parsedRating } }),
      ...(priceRange &&
        priceRange.length === 2 && {
          price: { $gte: priceRange[0], $lte: priceRange[1] },
        }),
    };

    const sortOrder: any =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
          ? { price: -1 }
          : order === 'toprated'
            ? { rating: -1 }
            : order === 'newest'
              ? { createdAt: -1 }
              : { _id: 1 };

    if (page > 1 && lastId) {
      matchFilter._id = { $gt: lastId };
    }

    const products = await Product.find(matchFilter).sort(sortOrder).limit(pageSize);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...countParams } = matchFilter;
    const countProducts = await Product.countDocuments(page > 1 ? countParams : matchFilter);
    const pages = Math.ceil(countProducts / pageSize);

    return {
      products,
      hasNextPage: page < pages,
      pages,
      total: countProducts,
      cursor: products.length ? products[products.length - 1]._id : null,
    };
  },
};

export default ProductDao;
