import ProductDao from '../dao/product';

const ProductService = {
  async getNewArrivals(params: any) {
    return await ProductDao.getNewArrivals(params);
  },
  getTopSelling(params: any) {
    return ProductDao.getTopSelling(params);
  },
};

export default ProductService;
