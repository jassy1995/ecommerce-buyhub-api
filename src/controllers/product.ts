import { NextFunction, Request, Response } from 'express';
import ProductService from '../services/product';

const ProductController = {
  async getNewArrivals(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.getNewArrivals(req.query);
      return res.status(200).json({ success: true, product });
    } catch (error: any) {
      return next(error);
    }
  },
  async getTopSelling(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.getTopSelling(req.query);
      return res.status(200).json({ success: true, product });
    } catch (error: any) {
      return next(error);
    }
  },
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const product = await ProductService.getProductById(productId);
      const productArgs = { productName: product.name, productId };
      const relativeProduct = await ProductService.getProductsByName(productArgs);
      /* console.log(relativeProduct); */
      /* const filteredResult = relativeProduct && relativeProduct.length > 0
        ? relativeProduct.filter((x: any) => x._id.toString() !== req.params.productId)
        : [];
      console.log(filteredResult);
      console.log(req.params.productId); */
      return res.status(200).json({ success: true, product, relativeProduct });
    } catch (error: any) {
      return next(error);
    }
  },
};

export default ProductController;
