import * as yup from 'yup';

const createDocumentSettingsBody = yup.object({});

export const createDocumentSettingsSchema = yup.object({
  body: createDocumentSettingsBody,
});

export interface CreateDocumentSettingsBody
  extends yup.InferType<typeof createDocumentSettingsBody> {}

const updateInvoiceBody = yup.object({
  number: yup.string().optional(),
  poNumber: yup.string().optional(),
  vendorName: yup.string().optional(),
  vendorAddress: yup.string().optional(),
  receiverName: yup.string().optional(),
  receiverAddress: yup.string().optional(),
  date: yup.string().optional(),
  dueDate: yup.string().optional(),
  tax: yup.number().optional(),
  discount: yup.number().optional(),
  shipping: yup.number().optional(),
  subtotal: yup.number().optional(),
  total: yup.number().optional(),
  items: yup
    .array()
    .of(
      yup.object().shape({
        description: yup.string().required(),
        price: yup.number().required(),
        quantity: yup.number().required(),
        total: yup.number().required(),
      })
    )
    .optional(),
});

const updateReceiptBody = yup.object({
  number: yup.string().optional(),
  poNumber: yup.string().optional(),
  vendorName: yup.string().optional(),
  vendorAddress: yup.string().optional(),
  receiverName: yup.string().optional(),
  receiverAddress: yup.string().optional(),
  date: yup.string().optional(),
  tax: yup.number().optional(),
  discount: yup.number().optional(),
  shipping: yup.number().optional(),
  subtotal: yup.number().optional(),
  total: yup.number().optional(),
  items: yup
    .array()
    .of(
      yup.object().shape({
        description: yup.string().required(),
        price: yup.number().required(),
        quantity: yup.number().required(),
        total: yup.number().required(),
      })
    )
    .optional(),
});

export const updateInvoiceSchema = yup.object({
  body: updateInvoiceBody,
});

export const updateReceiptSchema = yup.object({
  body: updateReceiptBody,
});

export interface UpdateInvoiceBody extends yup.InferType<typeof updateInvoiceBody> {}

export interface UpdateReceiptBody extends yup.InferType<typeof updateReceiptBody> {}
