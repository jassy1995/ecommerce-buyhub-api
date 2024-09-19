import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/auth';
import { UserRoles } from '../config/constants';
// import BusinessService from '../services/business';

const user = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    const token = req.headers.authorization.replace(/Bearer /gi, '');
    res.locals.user = verifyToken(token);
    next();
  } catch (e) {
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

const admin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    const token = req.headers.authorization.replace(/Bearer /gi, '');
    const decoded: any = verifyToken(token);
    if (decoded.role !== UserRoles.ADMIN) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    res.locals.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

const roles = (...roles: (typeof UserRoles)[keyof typeof UserRoles][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
      }
      const token = req.headers.authorization.replace(/Bearer /gi, '');
      const user: any = verifyToken(token);
      const exists = roles.some(role => role === user.role);
      if (!exists) {
        return res.status(403).json({ success: false, message: 'Not authorized' });
      }
      res.locals.user = user;
      next();
    } catch (e) {
      res.status(401).json({ success: false, message: 'Not authorized' });
    }
  };
};

// const business = (roles: string[] = []) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const user = res.locals.user.id;
//       const { business: id } = req.params;
//       const args: any = { business: id, user };
//       if (roles.length) args.role = roles;
//       const member = await BusinessService.getMember(args);
//       if (!member) return res.status(401).json({ success: false, message: 'Unauthorized' });
//       res.locals.business = { id: member.business.toString() };
//       next();
//     } catch (e) {
//       res.status(401).json({ success: false, message: 'Not authorized' });
//     }
//   };
// };

export default { user, admin, roles };

