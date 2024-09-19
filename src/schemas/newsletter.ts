import * as yup from 'yup';

const newsletterSubscribeBody = yup.object({
  name: yup.string().trim().required(),
  email: yup.string().email().trim().required(),
});

export const newsletterSubscribeSchema = yup.object({
  body: newsletterSubscribeBody,
});

export interface NewsletterSubscribeBody extends yup.InferType<typeof newsletterSubscribeBody> {}

const verifySubscriberBody = yup.object({
  token: yup.string().trim().required(),
});

export const verifySubscriberSchema = yup.object({
  body: verifySubscriberBody,
});
