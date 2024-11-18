import express, { NextFunction, Request, Response } from 'express';
import auth from './auth';
import user from './user';
import logger from '../lib/logger';

const router = express.Router();

router.get('/', (_req, res) => {
  return res.json({ success: true, message: 'Welcome to Buyhub API' });
});

router.use('/api/auth', auth);
router.use('/api/users', user);

router.use((_req, res) => {
  return res.status(404).json({ success: false, message: 'Route does not exist' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong, kindly contact support if the problem persists',
  });
});

export default router;
