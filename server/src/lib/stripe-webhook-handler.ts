import type Stripe from "stripe";
import { db } from "./db";
import { stripe } from "./stripe";
import { upsertSubscription } from "./subscriptions";

async function handleCheckoutCompleted(s: Stripe.Checkout.Session): Promise<void> {
  const userId = s.metadata?.user_id;
  if (!userId || !s.subscription) return;
  const subId = typeof s.subscription === "string" ? s.subscription : s.subscription.id;
  const sub = await stripe.subscriptions.retrieve(subId);
  await Promise.all([
    upsertSubscription(userId, sub, s.metadata?.tier),
    db.query("UPDATE users SET onboarding_completed=1 WHERE id=?", [userId]),
  ]);
}

async function handleSubscriptionEvent(sub: Stripe.Subscription): Promise<void> {
  const userId = sub.metadata?.user_id;
  if (!userId) return;
  await upsertSubscription(userId, sub, sub.metadata?.tier);
}

export async function handleStripeEvent(event: Stripe.Event): Promise<void> {
  if (event.type === "checkout.session.completed") {
    await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    return;
  }
  if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
    await handleSubscriptionEvent(event.data.object as Stripe.Subscription);
  }
}
