import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_unconfigured", {
  apiVersion: "2026-04-22.dahlia" as Parameters<typeof Stripe>[1]["apiVersion"],
});

// Maps UI plan id (BILLING_PLANS) → Stripe price. Free + Enterprise don't
// check out (Enterprise is "Contact sales"), so only the two paid tiers map.
export const PRICE_IDS: Record<string, string> = {
  pro: process.env.STRIPE_PRICE_CREATOR!,
  scale: process.env.STRIPE_PRICE_Business!,
};
