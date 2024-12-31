import * as yup from 'yup';

const createReviewBody = yup.object({
  userId: yup.string().required(),
  productId: yup.string().required(),
  rating: yup.number().required(),
  comment: yup.string().required(),
});

export const createReviewSchema = yup.object({
  body: yup.object({
    rating: yup.number().required(),
    comment: yup.string().required(),
  }),
  params: yup.object({
    userId: yup.string().required(),
    productId: yup.string().required(),
  }),
});
export const deleteReviewSchema = yup.object({
  params: yup.object({
    reviewId: yup.string().required(),
  }),
});

export type CreateReviewBody = yup.InferType<typeof createReviewBody>;
