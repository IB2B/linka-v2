import { db } from "./db";
import { stripe } from "./stripe";
import { recordRefundAudit, sendRefundEmail } from "./admin-refund-side-effects";

export type RefundResult = {
  refundId: string;
  amount: number;
  currency: string;
  subscriptionCanceled: boolean;
};

export async function refundUser(
  userId: string, adminId: string, chargeId: string,
): Promise<RefundResult> {
  const [[c]] = await db.query<any[]>(
    "SELECT COUNT(*) AS n FROM generated_content WHERE user_id = ?",
    [userId],
  );
  if (Number(c?.n ?? 0) > 0) throw new Error("User has generated content — refund blocked.");

  const [[s]] = await db.query<any[]>(
    `SELECT s.stripe_customer_id, s.stripe_subscription_id, s.status,
            u.email, u.first_name
       FROM subscriptions s
       INNER JOIN users u ON u.id = s.user_id
       WHERE s.user_id = ?`,
    [userId],
  );
  if (!s?.stripe_customer_id) throw new Error("User has no Stripe customer.");

  const charge = await stripe.charges.retrieve(chargeId);
  if (charge.customer !== s.stripe_customer_id) throw new Error("Charge does not belong to this user.");
  if (charge.refunded) throw new Error("This charge has already been refunded.");

  const refund = await stripe.refunds.create({ charge: charge.id });

  let canceled = false;
  if (s.stripe_subscription_id && s.status !== "canceled") {
    try {
      await stripe.subscriptions.cancel(s.stripe_subscription_id);
      canceled = true;
    } catch { /* already canceled in Stripe — proceed */ }
  }

  await db.query(
    `UPDATE subscriptions SET status='canceled', plan_tier='free', canceled_at=NOW()
       WHERE user_id=?`,
    [userId],
  );

  await recordRefundAudit(adminId, userId, {
    chargeId: charge.id, refundId: refund.id,
    amount: refund.amount, currency: refund.currency,
    subscriptionCanceled: canceled,
  });
  sendRefundEmail(s.email, s.first_name ?? "", refund.amount, refund.currency, canceled);

  return {
    refundId: refund.id,
    amount: refund.amount,
    currency: refund.currency,
    subscriptionCanceled: canceled,
  };
}
