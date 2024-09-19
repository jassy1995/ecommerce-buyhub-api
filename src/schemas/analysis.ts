import * as yup from 'yup';

export const initializeMbsSchema = yup.object({
  body: yup.object({
    accountNo: yup.string().required(),
    bankId: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    phone: yup.number().required(),
    name: yup.string().required(),
  }),
});

export const checkMbsStatusSchema = yup.object({
  body: yup.object({
    requestId: yup.string().required(),
  }),
});

export const submitMbsTicketSchema = yup.object({
  body: yup.object({
    ticketNo: yup.string().required(),
    password: yup.string().required(),
  }),
});

export const retrieveMbsPdfSchema = yup.object({
  body: yup.object({
    ticketNo: yup.string().required(),
  }),
});
