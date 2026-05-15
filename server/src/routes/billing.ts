import { Router } from "express";
import { db } from "../lib/db";
import { stripe } from "../lib/stripe";
import { getCustomerOverview } from "../lib/billing-overview";
import { ensureCustomerSubscription } from "../lib/subscriptions";
import { authenticate, type AuthRequest } from "../middleware/auth";

const router = Router();
router.use(authenticate);

const POSTS_LIMIT: Record<string, number> = { starter: 10, pro: 100, scale: 500, enterprise: 2000 };
const EMPTY = {
  balance: 0, currency: "usd", paymentMethods: [],
  defaultPaymentMethodId: null, invoices: [], upcoming: null,
};

router.get("/overview", async (req: AuthRequest, res, next) => {
  try {
    const [subs] = await db.query<any[]>("SELECT * FROM subscriptions WHERE user_id = ?", [req.user!.id]);
    const sub = subs[0];
    const customerId = sub?.stripe_customer_id ?? null;
    const overview = customerId ? await getCustomerOverview(customerId) : EMPTY;

    res.json({
      tier: (sub?.plan_tier ?? "free").toUpperCase(),
      status: (sub?.status ?? "free").toUpperCase(),
      hasStripeCustomer: !!customerId,
      ...overview,
      currentPeriodEnd: sub?.current_period_end ? new Date(sub.current_period_end).getTime() : null,
      cancelAtPeriodEnd: !!sub?.cancel_at_period_end,
      postsThisMonth: 0,
      postsLimit: POSTS_LIMIT[sub?.plan_tier ?? "starter"] ?? 10,
    });
  } catch (e) { next(e); }
});

router.post("/portal", async (req: AuthRequest, res, next) => {
  try {
    const [users] = await db.query<any[]>(
      "SELECT email, first_name, last_name FROM users WHERE id = ?", [req.user!.id]);
    const user = users[0];
    const [subs] = await db.query<any[]>(
      "SELECT stripe_customer_id FROM subscriptions WHERE user_id = ?", [req.user!.id]);
    let customerId: string | null = subs[0]?.stripe_customer_id ?? null;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user?.email,
        name: user ? `${user.first_name} ${user.last_name}` : undefined,
        metadata: { user_id: req.user!.id },
      });
      customerId = customer.id;
      await ensureCustomerSubscription(req.user!.id, customerId);
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    });
    res.json({ url: session.url });
  } catch (e) { next(e); }
});

export default router;
