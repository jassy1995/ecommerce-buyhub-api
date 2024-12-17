import Product from '../models/product';

const ProductDao = {
  async getNewArrivals(limit: number) {
    return Product.find().limit(limit);
  },
  async getTopSelling(limit: number) {
    const result = await Product.find().sort({ _id: -1 }).limit(limit);
    return result.reverse(); // Reverse to display in natural order
  },
};

export default ProductDao;
