import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia" as Parameters<typeof Stripe>[1]["apiVersion"],
});

export const PRICE_IDS: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER!,
  pro: process.env.STRIPE_PRICE_PROFESSIONAL!,
  scale: process.env.STRIPE_PRICE_ENTERPRISE!,
};
