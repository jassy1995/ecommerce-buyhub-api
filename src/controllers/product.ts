import { NextFunction, Request, Response } from 'express';
import ProductService from '../services/product';

const ProductController = {
  async getNewArrivals(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit = 6 } = req.query;
      const product = await ProductService.getNewArrivals(limit);
      return res.status(200).json({ success: true, product });
    } catch (error: any) {
      return next(error);
    }
  },
  async getTopSelling(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit = 6 } = req.query;
      const product = await ProductService.getNewArrivals(limit);
      return res.status(200).json({ success: true, product });
    } catch (error: any) {
      return next(error);
    }
  },
};

export default ProductController;
