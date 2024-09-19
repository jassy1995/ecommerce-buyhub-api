import * as yup from 'yup';

const launchSubscriberBody = yup.object({
  product: yup.string().lowercase().trim().required(),
  email: yup.string().email().lowercase().trim().required(),
});

export const launchSubscriberSchema = yup.object({
  body: launchSubscriberBody,
});

const createSampleDocumentBody = yup.object({
  category: yup.string().lowercase().trim().required(),
  comment: yup.string().trim().required(),
});

export const createSampleDocumentSchema = yup.object({
  body: createSampleDocumentBody,
});
