import { BILLING_PLANS } from "@/lib/billing/plans";
import type { BillingPlan } from "@/types/billing-plan";
import type { UserTier } from "@/lib/auth/me";

const TIER_RANK: Record<string, number> = {
  free: 0,
  starter: 0,
  pro: 1,
  professional: 2,
  scale: 2,
  enterprise: 3,
};

function rankOf(tier: string | null | undefined): number {
  return TIER_RANK[(tier ?? "free").toLowerCase()] ?? 0;
}

export function upgradesFrom(tier: UserTier): BillingPlan[] {
  const current = rankOf(tier);
  return BILLING_PLANS.filter((p) => rankOf(p.id) > current);
}
