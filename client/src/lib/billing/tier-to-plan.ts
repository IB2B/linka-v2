import type { BillingPlan, PlanTier } from "@/types/billing-plan";
import { BILLING_PLANS } from "./plans";

const TIER_TO_PLAN_ID: Record<string, PlanTier> = {
  free: "starter", starter: "starter", pro: "pro",
  scale: "scale", professional: "scale", enterprise: "enterprise",
};

export function planForTier(tier: string): BillingPlan | null {
  const id = TIER_TO_PLAN_ID[tier.toLowerCase()];
  if (!id) return null;
  return BILLING_PLANS.find((p) => p.id === id) ?? null;
}
