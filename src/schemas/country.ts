import * as yup from 'yup';

const createCountryBody = yup.object({
  code: yup.string().required(),
  name: yup.string().required(),
});

const updateCountryBody = yup.object({
  code: yup.string().optional(),
  name: yup.string().optional(),
});

export const createCountrySchema = yup.object({
  body: createCountryBody,
});

export const updateCountrySchema = yup.object({
  body: updateCountryBody,
});

export interface CreateCountryBody extends yup.InferType<typeof createCountryBody> {}

export interface UpdateCountryBody extends yup.InferType<typeof updateCountryBody> {}
