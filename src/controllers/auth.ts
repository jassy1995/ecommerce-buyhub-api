import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user';
import { signToken } from '../helpers/auth';
// import TokenService from '../services/token';
// import { addMinutes } from 'date-fns';
// import { generateOtp } from '../helpers/utils';
// import { UserRoles } from '../config/constants';
import FileService from '../services/file';
// import EmailService from '../services/email';
import AuthService from '../services/auth';

const AuthController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.create({ ...req.body });
      const token = signToken({ id: user.id, isAdmin: user.isAdmin });
      // await EmailService.sendWelcomeEmail({
      //   name: user.fullName || user.username,
      //   email: user.email,
      // });
      return res.status(201).json({ success: true, profile: { ...user, token } });
    } catch (e: any) {
      if (e.code === 11000) {
        let message;
        if (e.keyPattern.email) message = 'Email address already in use';
        else if (e.keyPattern.phone) message = 'Phone number already in use';
        if (message) {
          return res.status(400).json({ success: false, message });
        }
      }
      return next(e);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, remember } = req.body;
      const user = await UserService.getOne({ email }, { returnPassword: true });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Username or password incorrect',
        });
      }
      if (!user.password) {
        return res.status(400).json({
          success: false,
          message: 'Username or password incorrect',
        });
      }
      const correct = user.comparePasswords(password);
      if (!correct) {
        return res.status(400).json({
          success: false,
          message: 'Username or password incorrect',
        });
      }
      const token = signToken({ id: user.id, isAdmin: user.isAdmin }, remember ? '30d' : '1d');
      user.password = '';
      const profile = user ? user.toObject() : {};
      return res.status(200).json({ success: true, profile: { ...profile, token } });
    } catch (e: any) {
      return next(e);
    }
  },
  async loginGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.body.token;
      const payload = await AuthService.getGoogleUserInfo(accessToken);
      if (!AuthService.isValidGooglePayload(payload)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid credential, please try again',
        });
      }
      const user = await UserService.getOne({ email: payload.email });
      if (!user) {
        // user = await AuthService.createUserFromGooglePayload(payload);
        // await EmailService.sendWelcomeEmail({ name: user.firstName, email: user.email });
      } else {
        await AuthService.updateUserLastLogin(user);
      }
      // const token = signToken({ id: user.id, role: user.role }, '3d');
      // return res.status(200).json({ success: true, user, token });
    } catch (e: any) {
      if (e.toString().toLowerCase().includes('wrong number of segments in token')) {
        return res.status(400).json({ success: false, message: 'Invalid Credential' });
      }
      return next(e);
    }
  },
  async getProfile(_req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getOne({ _id: res.locals.user.id });
      if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({ success: true, user });
    } catch (e: any) {
      return next(e);
    }
  },
  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.user.id;
      const { currentPassword, newPassword } = req.body;
      const user: any = await UserService.getOne({ _id: id }, { returnPassword: true });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      const match = user.comparePasswords(currentPassword);
      if (!match) {
        return res.status(400).json({
          success: false,
          message: 'Current password is not correct',
        });
      }
      if (newPassword === currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Your new password cannot be the same as your current password',
        });
      }
      user.password = newPassword;
      await user.save();
      user.password = undefined;
      return res.status(200).json({
        success: true,
        message: 'Password changed',
      });
    } catch (e: any) {
      return next(e);
    }
  },
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.user.id;
      const user = await UserService.update(id, req.body);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      if (req.file) {
        req.file.buffer = await FileService.compressImage(req.file.buffer, 600);
        // user.image = await FileService.upload(req.file, `users/${id}`);
        await user.save();
      }
      return res.status(200).json({ success: true, user, message: 'Profile updated' });
    } catch (e) {
      return next(e);
    }
  },
};

export default AuthController;
