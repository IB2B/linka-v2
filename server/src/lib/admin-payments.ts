import type Stripe from "stripe";
import { stripe } from "./stripe";

export type AdminPayment = {
  id: string; number: string | null; created: number;
  amount: number; currency: string; status: string | null;
  customerEmail: string | null; description: string | null;
  cardBrand: string | null; cardLast4: string | null;
  hostedInvoiceUrl: string | null; invoicePdf: string | null;
  receiptUrl: string | null;
};

export type RevenuePoint = { month: string; revenue: number };

type DateRange = { from?: string; to?: string };

function createdParam(r: DateRange) {
  const p: { gte?: number; lte?: number } = {};
  if (r.from) p.gte = Math.floor(new Date(r.from).getTime() / 1000);
  if (r.to) p.lte = Math.floor(new Date(`${r.to}T23:59:59Z`).getTime() / 1000);
  return Object.keys(p).length ? p : undefined;
}

function chargeToPayment(c: Stripe.Charge): AdminPayment {
  const inv = typeof c.invoice === "object" && c.invoice !== null ? c.invoice : null;
  const card = c.payment_method_details?.card ?? null;
  return {
    id: inv?.id ?? c.id, number: inv?.number ?? null, created: c.created * 1000,
    amount: c.amount_captured || c.amount, currency: c.currency,
    status: c.status ?? null,
    customerEmail: inv?.customer_email ?? c.billing_details?.email ?? null,
    description: inv?.description ?? c.description ?? null,
    cardBrand: card?.brand ?? null, cardLast4: card?.last4 ?? null,
    hostedInvoiceUrl: inv?.hosted_invoice_url ?? null,
    invoicePdf: inv?.invoice_pdf ?? null,
    receiptUrl: c.receipt_url ?? null,
  };
}

export async function listPayments(cap = 500, range: DateRange = {}): Promise<AdminPayment[]> {
  const created = createdParam(range);
  const all = await stripe.charges
    .list({ limit: 100, expand: ["data.invoice"], ...(created ? { created } : {}) })
    .autoPagingToArray({ limit: cap });
  return all.map(chargeToPayment);
}

export async function getMonthlyRevenue(months = 12): Promise<RevenuePoint[]> {
  const since = Math.floor(Date.now() / 1000) - months * 31 * 24 * 3600;
  const all = await stripe.invoices
    .list({ limit: 100, status: "paid", created: { gte: since } })
    .autoPagingToArray({ limit: 5000 });
  const map: Record<string, number> = {};
  for (const inv of all) {
    const d = new Date(inv.created * 1000);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    map[key] = (map[key] ?? 0) + inv.amount_paid;
  }
  const result: RevenuePoint[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(1);
    d.setUTCMonth(d.getUTCMonth() - i);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    result.push({ month: key, revenue: (map[key] ?? 0) / 100 });
  }
  return result;
}
