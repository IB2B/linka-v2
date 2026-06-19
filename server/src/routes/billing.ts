import { Router } from "express";
import { db } from "../lib/db";
import { stripe } from "../lib/stripe";
import { getCustomerOverview } from "../lib/billing-overview";
import { getMonthlyUsage } from "../lib/posts-monthly-usage";
import { reconcileSubscription } from "../lib/subscription-sync";
import { getOrCreateStripeCustomer } from "../lib/stripe-customer";
import { authenticate, type AuthRequest } from "../middleware/auth";

const router = Router();
router.use(authenticate);

const EMPTY = {
  paymentMethods: [], defaultPaymentMethodId: null, invoices: [], upcoming: null,
  planAmount: null, planCurrency: null, planInterval: null,
};

router.get("/overview", async (req: AuthRequest, res, next) => {
  try {
    const [subs] = await db.query<any[]>("SELECT * FROM subscriptions WHERE user_id = ?", [req.user!.id]);
    let sub = subs[0];
    const customerId = sub?.stripe_customer_id ?? null;

    // Reconcile against Stripe on every load so portal-side changes
    // (cancellation, plan switch) show up even if their webhook never landed.
    const [reconciled, overview, usage] = await Promise.all([
      customerId ? reconcileSubscription(req.user!.id, customerId, sub?.plan_tier) : Promise.resolve(undefined),
      customerId ? getCustomerOverview(customerId) : Promise.resolve(EMPTY),
      getMonthlyUsage(req.user!.id),
    ]);
    if (reconciled) sub = reconciled;

    res.json({
      tier: (sub?.plan_tier ?? "free").toUpperCase(),
      status: (sub?.status ?? "free").toUpperCase(),
      hasStripeCustomer: !!customerId,
      ...overview,
      currentPeriodEnd: sub?.current_period_end ? new Date(sub.current_period_end).getTime() : null,
      cancelAtPeriodEnd: !!sub?.cancel_at_period_end,
      postsThisMonth: usage.used,
      postsLimit: usage.limit,
    });
  } catch (e) { next(e); }
});

router.post("/portal", async (req: AuthRequest, res, next) => {
  try {
    const customerId = await getOrCreateStripeCustomer(req.user!.id);
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    });
    res.json({ url: session.url });
  } catch (e) { next(e); }
});

export default router;
