import * as yup from 'yup';

const createBusinessBody = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  industry: yup.string().required(),
  website: yup.string().required(),
  country: yup.string().required(),
  rcNumber: yup.string().required(),
  size: yup.string().required(),
});

export const createBusinessSchema = yup.object({
  body: createBusinessBody,
});

const updateBusinessBody = yup.object({
  name: yup.string(),
  email: yup.string().email(),
  address: yup.string(),
  industry: yup.string(),
  website: yup.string(),
  country: yup.string(),
  state: yup.string(),
  city: yup.string(),
  rcNumber: yup.string(),
  size: yup.string(),
});

export const updateBusinessSchema = yup.object({
  body: updateBusinessBody,
  params: yup.object({
    id: yup.string().required(),
  }),
});

const createMemberInvitationBody = yup.object({
  email: yup.string().email().required(),
  role: yup.string().required(),
});

export const createMemberInvitationSchema = yup.object({
  body: createMemberInvitationBody,
  params: yup.object({
    business: yup.string().required(),
  }),
});

const respondToMemberInvitationBody = yup.object({
  response: yup.string().oneOf(['accept', 'reject']).required(),
});

const updateTeamMemberRoleBody = yup.object({
  role: yup.string().required(),
});

export const updateTeamMemberRoleSchema = yup.object({
  body: updateTeamMemberRoleBody,
  params: yup.object({
    id: yup.string().required(),
  }),
});

export const deleteByIdSchema = yup.object({
  params: yup.object({
    id: yup.string().required(),
  }),
});

export const respondToMemberInvitationSchema = yup.object({
  body: respondToMemberInvitationBody,
  params: yup.object({
    id: yup.string().required(),
  }),
});

export interface CreateBusinessBody extends yup.InferType<typeof createBusinessBody> {}

export interface UpdateBusinessBody extends yup.InferType<typeof updateBusinessBody> {}
