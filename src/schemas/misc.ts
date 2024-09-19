import * as yup from 'yup';

const resolveBankQuery = yup.object({
  accountNumber: yup.string().required(),
  bankCode: yup.string().required(),
});

export const resolveBankSchema = yup.object({
  query: resolveBankQuery,
});

export const rewriteArticleSchema = yup.object({
  body: yup.object({
    title: yup.string().required(),
    body: yup.string().required(),
    writer: yup.string().required(),
  }),
});

const createEventAttendeeBody = yup.object({
  event: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  country: yup.string().required(),
  ageGroup: yup.string().required(),
  interests: yup.array().of(yup.string()).default([]),
});

export const createEventAttendeeSchema = yup.object({
  body: createEventAttendeeBody,
});

const getEventAttendeesQuery = yup.object({
  event: yup.string().optional(),
});

export const getEventAttendeesSchema = yup.object({
  query: getEventAttendeesQuery,
});

export interface GetEventAttendeesQuery extends yup.InferType<typeof getEventAttendeesQuery> {}

export interface ResolveBankQuery extends yup.InferType<typeof resolveBankQuery> {}
