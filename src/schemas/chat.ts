import * as yup from 'yup';

const createChatBody = yup.object({
  message: yup.string().optional().trim(),
});

export const createChatSchema = yup.object({
  body: createChatBody,
});

const updateChatBody = yup.object({
  title: yup.string().max(32).required().trim(),
});

export const updateChatSchema = yup.object({
  body: updateChatBody,
  params: yup.object({
    id: yup.string().required(),
  }),
});

const chatResponseBody = yup.object({
  text: yup.string().required().trim(),
});

export const chatResponseSchema = yup.object({
  body: chatResponseBody,
  params: yup.object({
    id: yup.string().required(),
  }),
});

export interface UpdateChatBody extends yup.InferType<typeof updateChatBody> {}
