import type { PlanTier } from "@/types/billing-plan";

export const PRICE_IDS: Record<PlanTier, string> = {
  starter: process.env.STRIPE_PRICE_STARTER!,
  pro: process.env.STRIPE_PRICE_PROFESSIONAL!,
  scale: process.env.STRIPE_PRICE_SCALE!,
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE!,
};
