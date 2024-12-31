import express from 'express';
import ProductController from '../controllers/product';
import validate from '../middlewares/validate';
import { getProductByIdSchema } from '../schemas/product';

const router = express.Router();

router.get('/new-arrivals', ProductController.getNewArrivals);
router.get('/top-selling', ProductController.getTopSelling);
router.get('/product/:productId', validate(getProductByIdSchema), ProductController.getProductById);

export default router;
