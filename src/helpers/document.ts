import { AnalyzeExpenseCommandOutput } from '@aws-sdk/client-textract';
import { AnalyzedDocument, AnalyzeResult } from '@azure/ai-form-recognizer';
import { parseDateString } from './utils';

const extractNumber = (str: string = ''): string => {
  return str.match(/-?\d+(?:,\d+)*(?:\.\d+)?/)?.[0].replace(',', '') || str;
};

const parseAwsExpenseResponse = (res: AnalyzeExpenseCommandOutput) => {
  const lineItems = res.ExpenseDocuments?.[0].LineItemGroups?.[0].LineItems;
  const expenseFields = res?.ExpenseDocuments?.[0]?.SummaryFields;
  if (!lineItems || !expenseFields) return null;
  const items = lineItems
    .map(item => {
      return item.LineItemExpenseFields?.map(i => {
        if (!(i.Type?.Text && i.ValueDetection?.Text)) return null;
        return { [i.Type.Text]: i.ValueDetection.Text };
      })
        .filter(i => !!i)
        .reduce((acc, i) => {
          return { ...acc, ...i };
        }, {});
    })
    .filter(i => !!i);
  const fields: any = expenseFields
    .map(field => {
      const group = field.GroupProperties?.map(i => i.Types?.join(', ')).join(', ');
      const label = field.LabelDetection?.Text;
      const type = field.Type?.Text;
      const value = field.ValueDetection?.Text;
      return { group, label, type, value };
    })
    .filter(i => {
      return !!i.type && !!i.value;
    })
    .filter(i => !i.group)
    .reduce((acc: any, i: any) => {
      acc[i.type] = i.value;
      return acc;
    }, {});
  const currency = expenseFields.find(i => i.Type?.Text === 'TOTAL')?.Currency?.Code;
  return { fields, items, currency };
};

export const formatAwsResponseToInvoice = (res: AnalyzeExpenseCommandOutput) => {
  const result = parseAwsExpenseResponse(res);
  if (!result) return null;
  const { fields, items, currency } = result;
  const total = +extractNumber(fields.TOTAL);
  return {
    number: fields.INVOICE_RECEIPT_ID,
    vendorName: fields.VENDOR_NAME,
    poNumber: fields.PO_NUMBER,
    vendorAddress: fields.VENDOR_ADDRESS.replace(new RegExp(fields.VENDOR_NAME, 'gi'), '')
      .replaceAll('\n', ' ')
      .trim(),
    receiverName: fields.RECEIVER_NAME,
    receiverAddress: fields.RECEIVER_ADDRESS.replace(new RegExp(fields.RECEIVER_NAME, 'gi'), '')
      .replaceAll('\n', ' ')
      .trim(),
    receiverPhone: fields.RECEIVER_PHONE,
    tax: +extractNumber(fields.TAX) || 0,
    discount: +extractNumber(fields.DISCOUNT) || 0,
    subtotal: +extractNumber(fields.SUBTOTAL) || total,
    total,
    date: fields.INVOICE_RECEIPT_DATE
      ? parseDateString(fields.INVOICE_RECEIPT_DATE) || new Date(fields.INVOICE_RECEIPT_DATE)
      : null,
    dueDate: fields.DUE_DATE ? parseDateString(fields.DUE_DATE) || new Date(fields.DUE_DATE) : null,
    currency,
    shipping: +extractNumber(fields.SHIPPING_HANDLING_CHARGE) || 0,
    terms: fields.PAYMENT_TERMS,
    items: items.map(i => {
      const t = +extractNumber(i!.PRICE);
      const quantity = +i!.QUANTITY || 1;
      const price = +extractNumber(i!.UNIT_PRICE);
      return {
        description: i!.ITEM,
        quantity,
        price: price || t / quantity,
        total: t,
      };
    }),
  };
};

export const formatAwsResponseToReceipt = (res: AnalyzeExpenseCommandOutput) => {
  const result = parseAwsExpenseResponse(res);
  if (!result) return null;
  const { fields, items, currency } = result;
  const total = +extractNumber(fields.TOTAL);
  return {
    number: fields.INVOICE_RECEIPT_ID,
    vendorName: fields.VENDOR_NAME,
    poNumber: fields.PO_NUMBER,
    vendorAddress: fields.VENDOR_ADDRESS.replace(new RegExp(fields.VENDOR_NAME, 'gi'), '')
      .replaceAll('\n', ' ')
      .trim(),
    receiverName: fields.RECEIVER_NAME,
    receiverAddress: fields.RECEIVER_ADDRESS.replace(new RegExp(fields.RECEIVER_NAME, 'gi'), '')
      .replaceAll('\n', ' ')
      .trim(),
    receiverPhone: fields.RECEIVER_PHONE,
    tax: +extractNumber(fields.TAX) || 0,
    discount: +extractNumber(fields.DISCOUNT) || 0,
    subtotal: +extractNumber(fields.SUBTOTAL) || total,
    total,
    date: fields.INVOICE_RECEIPT_DATE
      ? parseDateString(fields.INVOICE_RECEIPT_DATE) || new Date(fields.INVOICE_RECEIPT_DATE)
      : null,
    currency,
    shipping: +extractNumber(fields.SHIPPING_HANDLING_CHARGE) || 0,
    terms: fields.PAYMENT_TERMS,
    items: items.map(i => {
      const t = +extractNumber(i!.PRICE);
      const quantity = +i!.QUANTITY || 1;
      const price = +extractNumber(i!.UNIT_PRICE);
      return {
        description: i!.ITEM,
        quantity,
        price: price || t / quantity,
        total: t,
      };
    }),
  };
};

export const parseAzureExpenseResponse = (res: AnalyzeResult) => {
  const document: AnalyzedDocument | undefined = res.documents?.[0];
  const fields: any = document?.fields;
  if (!fields) return null;
  const items = fields.Items.values.reduce((acc: any[], item: any) => {
    return [
      ...acc,
      {
        description: item.properties.Description?.value,
        price: item.properties.Price?.value,
        quantity: item.properties.Quantity?.value,
        total: item.properties.TotalPrice?.value,
      },
    ];
  }, []);
  return {
    items,
    vendorName: fields.MerchantName?.value,
    vendorAddress: fields.MerchantAddress?.content,
    vendorPhone: fields.MerchantPhoneNumber?.value,
    subtotal: fields.Subtotal?.value,
    total: fields.Total?.value,
    tax: fields.TotalTax?.value,
    date: fields.TransactionDate?.value,
  };
};
