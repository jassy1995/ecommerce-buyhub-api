import express from 'express';
import AuthController from '../controllers/auth';
import validate from '../middlewares/validate';
import {
  changePasswordSchema,
  // confirmOtpSchema,
  loginGoogleSchema,
  loginSchema,
  // resetPasswordSendSchema,
  // resetPasswordVerifySchema,
  signUpSchema,
  updateProfileSchema,
} from '../schemas/auth';
import authenticate from '../middlewares/authenticate';
import multer from 'multer';
// import rateLimit from 'express-rate-limit';
import passport from 'passport';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/signup/email', validate(signUpSchema), AuthController.signup);
router.post('/login/email', validate(loginSchema), AuthController.login);
router.post('/login/google', validate(loginGoogleSchema), AuthController.loginGoogle);
router.get('/profile', authenticate.user, AuthController.getProfile);
// router.post('/verification/email/send', [
//   authenticate.user,
//   AuthController.sendEmailVerificationOtp,
// ]);
// router.post('/verification/email/confirm', [
//   validate(confirmOtpSchema),
//   authenticate.user,
//   AuthController.confirmEmailVerificationOtp,
// ]);
// router.post('/password/reset/send', [
//   validate(resetPasswordSendSchema),
//   AuthController.sendResetPasswordOtp,
// ]);
// router.post('/password/reset/verify', [
//   validate(resetPasswordVerifySchema),
//   AuthController.verifyResetPasswordOtp,
// ]);
router.post('/password/change', [
  authenticate.user,
  validate(changePasswordSchema),
  AuthController.changePassword,
]);
router.patch('/profile', [
  authenticate.user,
  upload.single('image'),
  validate(updateProfileSchema, { stripUnknown: true }),
  AuthController.updateProfile,
]);

router.get('/twitter', (req, res, next) => {
  const user = req.query.u as string;
  const redirect = req.query.r as string;
  if (!user || !redirect) return res.status(400).json({ error: 'Invalid request' });
  (req.session as any).user = user;
  (req.session as any).redirect = redirect;
  return passport.authenticate('twitter', { state: user })(req, res, next);
});
router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(req.body.redirect);
  }
);

export default router;
