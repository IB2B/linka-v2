import type Stripe from "stripe";
import { stripe } from "./stripe";
import { upsertSubscription } from "./subscriptions";

export async function confirmCheckoutSession(
  userId: string, sessionId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return { ok: false, error: "Session not found" };
  }
  if (session.metadata?.user_id !== userId) {
    return { ok: false, error: "Session does not belong to this user" };
  }
  if (session.payment_status !== "paid") {
    return { ok: false, error: "Session not paid yet" };
  }
  if (!session.subscription) {
    return { ok: false, error: "No subscription on this session" };
  }
  const subId = typeof session.subscription === "string"
    ? session.subscription : session.subscription.id;
  const sub = await stripe.subscriptions.retrieve(subId);
  await upsertSubscription(userId, sub, session.metadata?.tier);
  return { ok: true };
}
