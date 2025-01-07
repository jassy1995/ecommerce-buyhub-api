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

export const getSearchProduct = yup.object({
  body: yup.object({
    params: yup.object().required("params is required! Add 'params' in body"),
  }),
});

export const getProductByIdSchema = yup.object({
  params: yup.object({
    productId: yup.string().required(),
  }),
});
