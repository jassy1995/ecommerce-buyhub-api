import * as yup from 'yup';

const createSnippetBody = yup.object({
  text: yup.string().lowercase().trim().required(),
});

export const createSnippetSchema = yup.object({
  body: createSnippetBody,
});
