import * as yup from 'yup';
import { InsightStatus, InsightTypes, Reactions } from '../config/constants';

const createInsightBody = yup.object({
  title: yup.string().required(),
  body: yup.string().required(),
  tags: yup.string(),
  category: yup.string().required(),
  writer: yup.string().optional(),
  background: yup.string().optional(),
  country: yup.string().required(),
  type: yup.string().oneOf(Object.values(InsightTypes)).optional(),
  excerpt: yup.string().optional(),
  status: yup.string().oneOf([InsightStatus.DRAFT, InsightStatus.PUBLISHED]),
  sources: yup.array().of(yup.string()).default([]),
  publishedAt: yup.date().optional(),
  external: yup.string().optional(),
  charts: yup
    .array()
    .of(
      yup.mixed().transform(s => {
        if (typeof s === 'string') return JSON.parse(s);
        return s;
      })
    )
    .optional(),
});

export const createInsightSchema = yup.object({
  body: createInsightBody,
});

const UpdateInsightBody = yup.object({
  title: yup.string().optional(),
  body: yup.string().optional(),
  tags: yup.string().optional(),
  category: yup.string().optional(),
  slug: yup.string().optional(),
  trending: yup.boolean().optional(),
  excerpt: yup.string().optional(),
});

export const updateInsightSchema = yup.object({
  body: UpdateInsightBody,
  params: yup.object({
    id: yup.string().required(),
  }),
});

export const createCommentSchema = yup.object({
  body: yup.object({
    content: yup.string().required(),
  }),
});

export const updateCommentSchema = yup.object({
  body: yup.object({
    content: yup.string().optional(),
  }),
});

export const createReactionSchema = yup.object({
  body: yup.object({
    reaction: yup.string().oneOf([Reactions.LIKE]).required(),
  }),
});

export const updateCommentReplySchema = yup.object({
  body: yup.object({
    content: yup.string().optional(),
  }),
});

export const getAllInsightsParamsSchema = yup.object({
  category: yup.string().optional(),
  author: yup.string().optional(),
  search: yup.string().optional(),
  status: yup.string().oneOf([InsightStatus.DRAFT, InsightStatus.PUBLISHED]).optional(),
  sort: yup.string().optional(),
  page: yup.number().integer().positive().optional(),
  limit: yup.number().integer().positive().optional(),
  populate: yup.array(yup.string().optional()).optional(),
  trending: yup.boolean().optional(),
  type: yup.string().oneOf(Object.values(InsightTypes)).optional(),
  country: yup.string().optional(),
  source: yup.string().optional(),
});

const createSavedInsightBody = yup.object({
  insight: yup.string().required(),
});

export const createSavedInsightSchema = yup.object({
  body: createSavedInsightBody,
});

export const createUserInsightSchema = yup.object({
  body: yup.object({
    title: yup.string().required(),
    body: yup.string().required(),
    category: yup.string().required(),
    background: yup.string().optional(),
    country: yup.string().required(),
    type: yup.string().oneOf([InsightTypes.POST, InsightTypes.QUESTION]).required(),
  }),
});

export const updateUserInsightSchema = yup.object({
  body: yup.object({
    title: yup.string().optional(),
    body: yup.string().optional(),
    category: yup.string().optional(),
    tags: yup.string().optional(),
  }),
});

export const createNewsSourceBody = yup.object({
  name: yup.string().required(),
  website: yup.string().required(),
  country: yup.string().required(),
});

export const createNewsSourceSchema = yup.object({
  body: createNewsSourceBody,
});

const updateNewsSourceBody = yup.object({
  name: yup.string().optional(),
  website: yup.string().optional(),
  country: yup.string().optional(),
});

export const updateNewsSourceSchema = yup.object({
  body: updateNewsSourceBody,
});

export type UpdateNewsSourceBody = yup.InferType<typeof updateNewsSourceBody>;

export type CreateNewsSourceBody = yup.InferType<typeof createNewsSourceBody>;

export type GetAllInsightsParams = yup.InferType<typeof getAllInsightsParamsSchema>;

export interface CreateInsightBody extends yup.InferType<typeof createInsightBody> {}

export interface UpdateInsightBody extends yup.InferType<typeof UpdateInsightBody> {}

export interface CreateInsightReaction {
  user: string;
  insight: string;
  reaction: string;
}

export interface CreateCommentBody {
  content: string;
  user: string;
  insight: string;
}

export interface UpdateCommentBody {
  content: string;
}

export interface CreateCommentReplyBody {
  content: string;
  user: string;
  comment: string;
  insight: string;
}

export interface UpdateCommentReplyBody {
  content: string;
}

export interface CreateCommentReactionBody {
  user: string;
  comment: string;
  reaction: string;
  insight: string;
}

export interface CreateCommentReplyReactionBody {
  user: string;
  reply: string;
  reaction: string;
  insight: string;
}

export interface GetAllSavedInsightParams {
  page?: number;
  limit?: number;
  populate?: string[];
  user?: string;
}

export interface CreateSavedInsightBody extends yup.InferType<typeof createSavedInsightBody> {
  user: string;
}
