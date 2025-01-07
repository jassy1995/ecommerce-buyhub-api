import ProductDao from '../dao/product';

const ProductService = {
  async getNewArrivals(params: any) {
    return await ProductDao.getNewArrivals(params);
  },
  getTopSelling(params: any) {
    return ProductDao.getTopSelling(params);
  },
  async getOne(args: any) {
    return ProductDao.getOne(args);
  },
  async getProductById(args: any) {
    return ProductDao.getProductById(args);
  },
  async getProductsByName(args: any) {
    return ProductDao.getProductsByName(args);
  },
  async getFilterableOption() {
    return ProductDao.getFilterableOption();
  },
  async getSearchProducts(args: any) {
    return ProductDao.getSearchProducts(args);
  },
};

export default ProductService;
