export type AdminCharge = {
  id: string;
  created: number;
  description: string | null;
  amount: number;
  currency: string;
  status: string;
  paid: boolean;
  refunded: boolean;
  cardBrand: string | null;
  cardLast4: string | null;
  receiptUrl: string | null;
  customerEmail: string | null;
};

export type AdminInvoice = {
  id: string;
  number: string | null;
  created: number;
  amountDue: number;
  amountPaid: number;
  currency: string;
  status: string | null;
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
  customerEmail: string | null;
  description: string | null;
};
