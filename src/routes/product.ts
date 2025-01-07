import express from 'express';
import ProductController from '../controllers/product';
import validate from '../middlewares/validate';
import { getProductByIdSchema, getSearchProduct } from '../schemas/product';

const router = express.Router();

router.get('/new-arrivals', ProductController.getNewArrivals);
router.get('/top-selling', ProductController.getTopSelling);
router.get('/product/:productId', validate(getProductByIdSchema), ProductController.getProductById);
router.get('/filter-params', ProductController.getFilterableOption);
router.post('/search', validate(getSearchProduct), ProductController.getSearchProducts);

export default router;
