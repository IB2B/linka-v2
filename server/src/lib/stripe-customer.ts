import { db } from "./db";
import { stripe } from "./stripe";
import { ensureCustomerSubscription } from "./subscriptions";

// Reuse one Stripe customer per user. Passing customer_email to checkout makes
// Stripe mint a fresh customer every time, scattering subscriptions (and any
// portal cancellation) across duplicates the app never reads. Always go
// through here so checkout and the billing portal share a single customer.
export async function getOrCreateStripeCustomer(userId: string): Promise<string> {
  const [subs] = await db.query<any[]>(
    "SELECT stripe_customer_id FROM subscriptions WHERE user_id = ?", [userId]);
  const existing = subs[0]?.stripe_customer_id as string | undefined;
  if (existing) return existing;

  const [users] = await db.query<any[]>(
    "SELECT email, first_name, last_name FROM users WHERE id = ?", [userId]);
  const user = users[0];
  const customer = await stripe.customers.create({
    email: user?.email,
    name: user ? `${user.first_name} ${user.last_name}` : undefined,
    metadata: { user_id: userId },
  });
  await ensureCustomerSubscription(userId, customer.id);
  return customer.id;
}
