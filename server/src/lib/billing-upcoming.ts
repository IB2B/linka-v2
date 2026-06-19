import type Stripe from "stripe";
import { stripe } from "./stripe";

export type Upcoming = { amountDue: number; currency: string; nextPaymentAttempt: number | null } | null;

// The next charge. Prefer Stripe's live invoice preview (captures proration,
// discounts); fall back to the subscription's recurring amount if preview fails.
export async function resolveUpcoming(customerId: string, sub: Stripe.Subscription | null): Promise<Upcoming> {
  try {
    const up = await stripe.invoices.createPreview({ customer: customerId });
    return {
      amountDue: up.amount_due, currency: up.currency,
      nextPaymentAttempt: up.next_payment_attempt ? up.next_payment_attempt * 1000 : null,
    };
  } catch {
    const item = sub?.items.data[0];
    if (!sub || !item) return null;
    const end = item.current_period_end;
    return {
      amountDue: item.price.unit_amount ?? 0, currency: sub.currency,
      nextPaymentAttempt: end ? end * 1000 : null,
    };
  }
}
