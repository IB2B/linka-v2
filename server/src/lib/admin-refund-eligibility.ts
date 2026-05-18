import { db } from "./db";
import { stripe } from "./stripe";

export type LastCharge = {
  id: string; amount: number; currency: string; refunded: boolean;
};

export type RefundEligibility = {
  draftCount: number;
  lastCharge: LastCharge | null;
  subActive: boolean;
};

export async function getRefundEligibility(userId: string): Promise<RefundEligibility> {
  const [[c]] = await db.query<any[]>(
    "SELECT COUNT(*) AS n FROM generated_content WHERE user_id = ?",
    [userId],
  );
  const draftCount = Number(c?.n ?? 0);

  const [[s]] = await db.query<any[]>(
    `SELECT stripe_customer_id, stripe_subscription_id, status
       FROM subscriptions WHERE user_id = ?`,
    [userId],
  );

  let lastCharge: LastCharge | null = null;
  if (s?.stripe_customer_id) {
    const list = await stripe.charges.list({ customer: s.stripe_customer_id, limit: 1 });
    const ch = list.data[0];
    if (ch) {
      lastCharge = {
        id: ch.id,
        amount: ch.amount_captured || ch.amount,
        currency: ch.currency,
        refunded: ch.refunded || ch.amount_refunded >= ch.amount,
      };
    }
  }

  return {
    draftCount,
    lastCharge,
    subActive: !!(s?.stripe_subscription_id && s.status !== "canceled"),
  };
}
