import { db } from "./db";
import { stripe } from "./stripe";

export async function softDeleteUser(userId: string): Promise<void> {
  const [[s]] = await db.query<any[]>(
    "SELECT stripe_subscription_id, status FROM subscriptions WHERE user_id = ?",
    [userId],
  );
  if (s?.stripe_subscription_id && s.status !== "canceled") {
    try { await stripe.subscriptions.cancel(s.stripe_subscription_id); } catch {
      /* already canceled in Stripe — continue */
    }
  }

  await db.query(
    `UPDATE users
       SET email = CONCAT('deleted-', id, '@deleted.linka'),
           first_name = '',
           last_name = '',
           password_hash = '',
           deleted_at = NOW(3),
           session_version = session_version + 1
     WHERE id = ? AND deleted_at IS NULL`,
    [userId],
  );

  await db.query(
    `UPDATE subscriptions
       SET status = 'canceled', plan_tier = 'free', canceled_at = NOW()
     WHERE user_id = ?`,
    [userId],
  );
}
