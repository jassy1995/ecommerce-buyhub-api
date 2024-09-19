import * as yup from 'yup';

const createStatementBody = yup.object({
  name: yup.string().required(),
  transactionId: yup.string().required(),
  type: yup.string().required(),
  bank: yup.string().required(),
  from: yup.string().required(),
  totalDebit: yup.number().required(),
  totalCredit: yup.number().required(),
});

export const createStatementSchema = yup.object({
  body: createStatementBody,
});

export interface CreateStatementBody extends yup.InferType<typeof createStatementBody> {}

const createBankingSettingsBody = yup.object({});

export const createBankingSettingsSchema = yup.object({
  body: createBankingSettingsBody,
});

export interface CreateBankingSettingsBody
  extends yup.InferType<typeof createBankingSettingsBody> {}

const updateBankingSettingsBody = yup.object({
  monoApp: yup.string().trim().optional(),
  monoSecretKey: yup.string().trim().optional(),
  mbsUsername: yup.string().trim().optional(),
  mbsClientId: yup.string().trim().optional(),
  mbsClientSecret: yup.string().trim().optional(),
  widgetDisplayName: yup.string().trim().optional(),
  widgetThemeColor: yup.string().trim().optional(),
});

export const updateBankingSettingsSchema = yup.object({
  body: updateBankingSettingsBody,
});

export interface UpdateBankingSettingsBody
  extends yup.InferType<typeof updateBankingSettingsBody> {}
