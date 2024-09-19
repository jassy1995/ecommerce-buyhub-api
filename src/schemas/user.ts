import * as yup from 'yup';
import { WriterRequestStatus } from '../config/constants';

const updateWriterRequestBody = yup.object({
  status: yup.string().oneOf(Object.values(WriterRequestStatus)).required(),
  reason: yup.string(),
});

export const updateWriterRequestSchema = yup.object({
  body: updateWriterRequestBody,
});

export interface CreateWriterRequestBody {
  user: string;
  status: string;
}

export interface UpdateWriterRequestBody extends yup.InferType<typeof updateWriterRequestBody> {}
