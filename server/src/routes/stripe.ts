import { Router } from "express";
import type Stripe from "stripe";
import { db } from "../lib/db";
import { stripe, PRICE_IDS } from "../lib/stripe";
import { upsertSubscription } from "../lib/subscriptions";
import { authenticate, type AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/checkout", authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { tier } = req.body as { tier: keyof typeof PRICE_IDS };
    const priceId = PRICE_IDS[tier];
    if (!priceId) { res.status(400).json({ error: "Invalid tier" }); return; }

    const [users] = await db.query<any[]>(
      "SELECT id, email FROM users WHERE id = ?", [req.user!.id]);
    const user = users[0];
    if (!user) { res.status(404).json({ error: "User not found" }); return; }

    const base = process.env.NEXT_PUBLIC_APP_URL;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email,
      metadata: { user_id: user.id, tier },
      subscription_data: { metadata: { user_id: user.id, tier } },
      success_url: `${base}/dashboard/billing?success=1`,
      cancel_url: `${base}/dashboard/billing`,
    });
    res.json({ url: session.url });
  } catch (e) { next(e); }
});

router.post("/webhook", async (req, res, next) => {
  try {
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body as Buffer, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch { res.status(400).json({ error: "Invalid signature" }); return; }

    if (event.type === "checkout.session.completed") {
      const s = event.data.object as Stripe.Checkout.Session;
      const sub = await stripe.subscriptions.retrieve(s.subscription as string);
      await Promise.all([
        upsertSubscription(s.metadata!.user_id, sub, s.metadata!.tier),
        db.query("UPDATE users SET onboarding_completed=1 WHERE id=?", [s.metadata!.user_id]),
      ]);
    }
    if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.user_id;
      if (userId) await upsertSubscription(userId, sub, sub.metadata?.tier);
    }
    res.json({ received: true });
  } catch (e) { next(e); }
});

export default router;
