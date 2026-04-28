import type Stripe from "stripe";
import { stripe } from "./stripe";

export type CustomerOverview = {
  balance: number;
  currency: string;
  paymentMethods: object[];
  defaultPaymentMethodId: string | null;
  invoices: object[];
  upcoming: { amountDue: number; currency: string; nextPaymentAttempt: number | null } | null;
};

export async function getCustomerOverview(customerId: string): Promise<CustomerOverview> {
  const [customer, pms, invList] = await Promise.all([
    stripe.customers.retrieve(customerId) as Promise<Stripe.Customer>,
    stripe.customers.listPaymentMethods(customerId, { type: "card" }),
    stripe.invoices.list({ customer: customerId, limit: 10 }),
  ]);
  const defaultPmId = typeof customer.invoice_settings?.default_payment_method === "string"
    ? customer.invoice_settings.default_payment_method : null;

  const paymentMethods = pms.data.map((pm) => ({
    id: pm.id, brand: pm.card!.brand, last4: pm.card!.last4,
    expMonth: pm.card!.exp_month, expYear: pm.card!.exp_year,
    funding: pm.card!.funding, isDefault: pm.id === defaultPmId,
  }));
  const invoices = invList.data.map((inv) => ({
    id: inv.id, number: inv.number, status: inv.status, amountPaid: inv.amount_paid,
    amountDue: inv.amount_due, currency: inv.currency, created: inv.created * 1000,
    hostedInvoiceUrl: inv.hosted_invoice_url ?? null,
    invoicePdf: inv.invoice_pdf ?? null, description: inv.description ?? null,
  }));

  let upcoming: CustomerOverview["upcoming"] = null;
  try {
    const up = await stripe.invoices.createPreview({ customer: customerId });
    upcoming = { amountDue: up.amount_due, currency: up.currency, nextPaymentAttempt: up.next_payment_attempt ? up.next_payment_attempt * 1000 : null };
  } catch { upcoming = null; }

  return {
    balance: customer.balance ?? 0,
    currency: customer.currency ?? "usd",
    paymentMethods, defaultPaymentMethodId: defaultPmId, invoices, upcoming,
  };
}
