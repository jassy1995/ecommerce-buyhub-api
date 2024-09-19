import * as yup from 'yup';

const createCategoryBody = yup.object({
  name: yup.string().required(),
});

export const createCategorySchema = yup.object({
  body: createCategoryBody,
});

export interface CreateCategoryBody extends yup.InferType<typeof createCategoryBody> {}

const updateCategoryBody = yup.object({
  name: yup.string().optional(),
});

export const updateCategorySchema = yup.object({
  body: updateCategoryBody,
  params: yup.object({
    id: yup.string().required(),
  }),
});

export interface UpdateCategoryBody extends yup.InferType<typeof updateCategoryBody> {}
