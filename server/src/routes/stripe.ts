import { Router } from "express";
import type Stripe from "stripe";
import { db } from "../lib/db";
import { stripe, PRICE_IDS } from "../lib/stripe";
import { confirmCheckoutSession } from "../lib/stripe-session-confirm";
import { handleStripeEvent } from "../lib/stripe-webhook-handler";
import { getOrCreateStripeCustomer } from "../lib/stripe-customer";
import { authenticate, type AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/checkout", authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { tier } = req.body as { tier: keyof typeof PRICE_IDS };
    const priceId = PRICE_IDS[tier];
    if (!priceId) { res.status(400).json({ error: "Invalid tier" }); return; }

    const customerId = await getOrCreateStripeCustomer(req.user!.id);
    const base = process.env.NEXT_PUBLIC_APP_URL;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer: customerId,
      metadata: { user_id: req.user!.id, tier },
      subscription_data: { metadata: { user_id: req.user!.id, tier } },
      success_url: `${base}/dashboard/billing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/dashboard/billing`,
    });
    // Committing to a plan means onboarding is done — mark it now so the
    // /dashboard return isn't bounced back to onboarding by the layout gate
    // before the async webhook/confirm has a chance to run.
    await db.query("UPDATE users SET onboarding_completed=1 WHERE id=?", [req.user!.id]);
    res.json({ url: session.url });
  } catch (e) { next(e); }
});

router.post("/confirm", authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { sessionId } = req.body as { sessionId?: string };
    if (!sessionId) { res.status(400).json({ error: "Missing sessionId" }); return; }
    const result = await confirmCheckoutSession(req.user!.id, sessionId);
    if (!result.ok) { res.status(400).json({ error: result.error }); return; }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.post("/webhook", async (req, res, next) => {
  try {
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body as Buffer, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch { res.status(400).json({ error: "Invalid signature" }); return; }
    await handleStripeEvent(event);
    res.json({ received: true });
  } catch (e) { next(e); }
});

export default router;
