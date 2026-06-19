import type Stripe from "stripe";
import { stripe } from "./stripe";
import { mapInvoices, mapPaymentMethods } from "./billing-overview-map";
import { resolveUpcoming, type Upcoming } from "./billing-upcoming";

export type CustomerOverview = {
  paymentMethods: object[];
  defaultPaymentMethodId: string | null;
  invoices: object[];
  upcoming: Upcoming;
  // The subscription's actual recurring price — source of truth for what the
  // user pays, so the plan card matches the next charge and invoices.
  planAmount: number | null;
  planCurrency: string | null;
  planInterval: string | null;
};

export async function getCustomerOverview(customerId: string): Promise<CustomerOverview> {
  const [customer, pms, invList, subList] = await Promise.all([
    stripe.customers.retrieve(customerId) as Promise<Stripe.Customer>,
    stripe.customers.listPaymentMethods(customerId, { type: "card" }),
    stripe.invoices.list({ customer: customerId, limit: 10 }),
    stripe.subscriptions.list({ customer: customerId, status: "all", limit: 1 }),
  ]);
  const defaultPmId = typeof customer.invoice_settings?.default_payment_method === "string"
    ? customer.invoice_settings.default_payment_method : null;
  const sub = subList.data[0] ?? null;
  const price = sub?.items.data[0]?.price ?? null;

  return {
    paymentMethods: mapPaymentMethods(pms.data, defaultPmId),
    defaultPaymentMethodId: defaultPmId,
    invoices: mapInvoices(invList.data),
    upcoming: await resolveUpcoming(customerId, sub),
    planAmount: price?.unit_amount ?? null,
    planCurrency: sub?.currency ?? null,
    planInterval: price?.recurring?.interval ?? null,
  };
}
