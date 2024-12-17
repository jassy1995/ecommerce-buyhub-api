import express from 'express';
import ProductController from '../controllers/product';

const router = express.Router();

router.get('/new-arrival', ProductController.getNewArrivals);
router.get('/top-selling', ProductController.getTopSelling);

export default router;
