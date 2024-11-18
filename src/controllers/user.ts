import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user';
// import FileService from '../services/file';

const UserController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json({ success: true, user });
    } catch (e: any) {
      if (e.code === 11000) {
        let message;
        if (e.keyPattern.email) message = 'Email address already in use';
        else if (e.keyPattern.phone) message = 'Phone number already in use';
        else if (e.keyPattern.username) message = 'Username already in use';
        if (message) {
          return res.status(400).json({ success: false, message });
        }
      }
      return next(e);
    }
  },
  // async getAll(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { role, status, search, type, page = 1, limit = 20 } = req.query;
  //     const users = await UserService.getAll({
  //       status,
  //       search,
  //       role,
  //       type,
  //       page,
  //       limit,
  //     });
  //     const total = await UserService.getCount({
  //       status,
  //       search,
  //       role,
  //       type,
  //     });
  //     const fetched = page && limit ? +page * +limit : 0;
  //     const remains = Math.max(total - fetched, 0);
  //     const next = remains >= 1 ? +page + 1 : null;
  //     return res.status(200).json({ success: true, next, total, users });
  //   } catch (error: any) {
  //     return next(error);
  //   }
  // },
  // async update(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const user = await UserService.update(id, req.body);
  //     if (!user) {
  //       return res.status(400).json({ success: false, message: 'Could not update user' });
  //     }
  //     if (req.file) {
  //       user.image = await FileService.upload(req.file.path);
  //       await user.save();
  //     }
  //     return res.status(200).json({ success: true, user });
  //   } catch (e: any) {
  //     next(e);
  //   }
  // },
  // async delete(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const user = await UserService.delete(id);
  //     if (!user) {
  //       return res.status(400).json({ success: false, message: 'Could not delete user' });
  //     }
  //     return res.status(200).json({ success: true, user });
  //   } catch (e: any) {
  //     next(e);
  //   }
  // },
  // async getWriters(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { type, search, page = 1, limit = 20 } = req.query;
  //     const users = await UserService.getAll({
  //       type,
  //       role: UserRoles.WRITER,
  //       search,
  //       page,
  //       limit,
  //     });
  //     const total = await UserService.getCount({
  //       type,
  //       role: UserRoles.WRITER,
  //       search,
  //     });
  //     const fetched = page && limit ? +page * +limit : 0;
  //     const remains = Math.max(total - fetched, 0);
  //     const next = remains >= 1 ? +page + 1 : null;
  //     return res.status(200).json({ success: true, next, total, users });
  //   } catch (error: any) {
  //     return next(error);
  //   }
  // },
  // async getUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { username } = req.params;
  //     const user = await UserService.getOne({ username });
  //     if (!user) {
  //       return res.status(404).json({ success: false, message: 'User not found' });
  //     }
  //     return res.status(200).json({ success: true, user });
  //   } catch (error: any) {
  //     return next(error);
  //   }
  // },
};

export default UserController;
