import { randomUUID } from "node:crypto";
import type Stripe from "stripe";
import { db } from "./db";

export async function upsertSubscription(userId: string, sub: Stripe.Subscription, tier?: string) {
  await db.query(
    `INSERT INTO subscriptions (
       id, user_id, stripe_customer_id, stripe_subscription_id, plan_tier, status,
       current_period_start, current_period_end, cancel_at_period_end, canceled_at
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       stripe_customer_id = VALUES(stripe_customer_id),
       stripe_subscription_id = VALUES(stripe_subscription_id),
       plan_tier = VALUES(plan_tier),
       status = VALUES(status),
       current_period_start = VALUES(current_period_start),
       current_period_end = VALUES(current_period_end),
       cancel_at_period_end = VALUES(cancel_at_period_end),
       canceled_at = VALUES(canceled_at)`,
    [
      randomUUID(), userId, sub.customer as string, sub.id,
      tier ?? sub.metadata?.tier ?? "starter", sub.status,
      new Date(sub.current_period_start * 1000),
      new Date(sub.current_period_end * 1000),
      sub.cancel_at_period_end,
      sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
    ],
  );
}

export async function ensureCustomerSubscription(userId: string, customerId: string) {
  await db.query(
    `INSERT INTO subscriptions (id, user_id, stripe_customer_id) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE stripe_customer_id = VALUES(stripe_customer_id)`,
    [randomUUID(), userId, customerId],
  );
}
