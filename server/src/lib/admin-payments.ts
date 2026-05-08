import { stripe } from "./stripe";

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

export async function listCharges(limit = 50): Promise<AdminCharge[]> {
  const res = await stripe.charges.list({ limit });
  return res.data.map((c) => ({
    id: c.id,
    created: c.created * 1000,
    description: c.description ?? null,
    amount: c.amount,
    currency: c.currency,
    status: c.status,
    paid: c.paid,
    refunded: c.refunded,
    cardBrand: c.payment_method_details?.card?.brand ?? null,
    cardLast4: c.payment_method_details?.card?.last4 ?? null,
    receiptUrl: c.receipt_url ?? null,
    customerEmail: c.billing_details?.email ?? null,
  }));
}

export async function listInvoices(limit = 50): Promise<AdminInvoice[]> {
  const res = await stripe.invoices.list({ limit });
  return res.data.map((i) => ({
    id: i.id ?? "",
    number: i.number ?? null,
    created: i.created * 1000,
    amountDue: i.amount_due,
    amountPaid: i.amount_paid,
    currency: i.currency,
    status: i.status ?? null,
    hostedInvoiceUrl: i.hosted_invoice_url ?? null,
    invoicePdf: i.invoice_pdf ?? null,
    customerEmail: i.customer_email ?? null,
    description: i.description ?? null,
  }));
}
