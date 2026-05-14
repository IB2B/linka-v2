export type AdminPayment = {
  id: string;
  number: string | null;
  created: number;
  amount: number;
  currency: string;
  status: string | null;
  customerEmail: string | null;
  description: string | null;
  cardBrand: string | null;
  cardLast4: string | null;
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
  receiptUrl: string | null;
};
