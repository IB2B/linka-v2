import type Stripe from "stripe";
import { db } from "./db";
import { stripe, PRICE_IDS } from "./stripe";
import { upsertSubscription } from "./subscriptions";

// Reverse PRICE_IDS so a live Stripe price resolves back to our tier key,
// keeping plan_tier correct after a portal-side plan switch.
function tierFromSubscription(sub: Stripe.Subscription): string | undefined {
  const priceId = sub.items.data[0]?.price?.id;
  if (!priceId) return undefined;
  return Object.entries(PRICE_IDS).find(([, id]) => id === priceId)?.[0];
}

// Pull the customer's latest subscription straight from Stripe and persist it,
// so the billing page reflects portal changes (cancellation, plan switch) even
// when the matching webhook never reached us. Returns the refreshed DB row, or
// undefined if there is nothing to reconcile or Stripe is unreachable (in which
// case the caller falls back to the cached row rather than blanking billing).
export async function reconcileSubscription(
  userId: string, customerId: string, currentTier?: string,
): Promise<Record<string, any> | undefined> {
  try {
    const list = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 1 });
    const fresh = list.data[0];
    if (!fresh) return undefined;
    const tier = tierFromSubscription(fresh) ?? fresh.metadata?.tier ?? currentTier;
    await upsertSubscription(userId, fresh, tier);
    const [rows] = await db.query<any[]>("SELECT * FROM subscriptions WHERE user_id = ?", [userId]);
    return rows[0];
  } catch {
    return undefined;
  }
}
