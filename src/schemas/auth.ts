import * as yup from 'yup';
import { UserRoles, UserType } from '../config/constants';

const signUpBody = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  image: yup.string().optional(),
  password: yup.string().min(4).required(),
  isAdmin: yup.boolean().default(false),
});

export const signUpSchema = yup.object({
  body: signUpBody,
});

export const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
    remember: yup.boolean().default(false),
  }),
});

export const loginGoogleSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    image: yup.string().optional(),
  }),
});

export const confirmOtpSchema = yup.object({
  body: yup.object({
    otp: yup.string().required(),
  }),
});

export const changePasswordSchema = yup.object({
  body: yup.object({
    currentPassword: yup.string().min(8).required(),
    newPassword: yup.string().min(8).required(),
  }),
});

export const updateProfileSchema = yup.object({
  body: yup.object({
    firstName: yup.string().optional(),
    lastName: yup.string().optional(),
    middleName: yup.string().optional(),
    username: yup.string().optional(),
    bio: yup.string().optional(),
    country: yup.string().optional(),
  }),
});

export const createUserSchema = yup.object({
  body: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().optional(),
    middleName: yup.string().optional(),
    username: yup.string().required(),
    password: yup.string().min(8).optional(),
    bio: yup.string().optional(),
    role: yup
      .string()
      .oneOf([UserRoles.USER, UserRoles.WRITER, UserRoles.ADMIN])
      .default(UserRoles.USER),
    country: yup.string().optional(),
    email: yup.string().email().required(),
    phone: yup.string().optional(),
    type: yup.string().oneOf([UserType.HUMAN, UserType.AI]).default(UserType.HUMAN),
  }),
});

export const updateUserSchema = yup.object({
  body: yup.object({
    firstName: yup.string().optional(),
    lastName: yup.string().optional(),
    middleName: yup.string().optional(),
    username: yup.string().optional(),
    bio: yup.string().optional(),
    country: yup.string().optional(),
    email: yup.string().email().optional(),
    phone: yup.string().optional(),
  }),
});

export const getUserSchema = yup.object({
  query: yup.object({
    search: yup.string().optional(),
    role: yup.string().oneOf([UserRoles.USER, UserRoles.WRITER, UserRoles.ADMIN]).optional(),
    type: yup.string().oneOf([UserType.HUMAN, UserType.AI]).optional(),
    status: yup.string().optional(),
  }),
});

export const resetPasswordSendSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
  }),
});

export const resetPasswordVerifySchema = yup.object({
  body: yup.object({
    otp: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().required(),
  }),
});

export interface SignUpBody extends yup.InferType<typeof signUpBody> {}

const createUserSuspensionBody = yup.object({
  expiration: yup.date().optional(),
  reason: yup.string().required(),
  user: yup.string().required(),
});

const updateUserSuspensionBody = yup.object({
  suspended: yup.boolean().required(),
  expiration: yup.date().optional(),
});

export const createUserSuspensionSchema = yup.object({
  body: createUserSuspensionBody,
});

export const updateUserSuspensionSchema = yup.object({
  body: updateUserSuspensionBody,
});

export interface CreateUserSuspensionBody extends yup.InferType<typeof createUserSuspensionBody> {}

export interface UpdateUserSuspensionBody extends yup.InferType<typeof updateUserSuspensionBody> {}

const createUserBanBody = yup.object({
  reason: yup.string().required(),
  user: yup.string().required(),
});

const updateUserBanBody = yup.object({
  banned: yup.boolean().required(),
});

export const createUserBanSchema = yup.object({
  body: createUserBanBody,
});

export const updateUserBanSchema = yup.object({
  body: updateUserBanBody,
});

export interface CreateUserBanBody extends yup.InferType<typeof createUserBanBody> {}

export interface UpdateUserBanBody extends yup.InferType<typeof updateUserBanBody> {}
