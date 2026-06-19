import type { PlanPrices } from "./stripe-plan-prices";

// Stripe price key for a stored plan tier ("professional" is a legacy Business alias).
const PRICE_KEY: Record<string, string> = { pro: "pro", scale: "scale", professional: "scale" };

// A user's monthly recurring revenue: their plan's live Stripe price, counted
// only while the subscription is actually active. Free/inactive -> null.
export function userMrr(
  planTier: string | null, subStatus: string | null, prices: PlanPrices,
): { mrr: number | null; currency: string | null } {
  const key = PRICE_KEY[(planTier ?? "").toLowerCase()];
  const price = key ? prices[key] : undefined;
  if (!price || (subStatus ?? "").toLowerCase() !== "active") return { mrr: null, currency: null };
  return { mrr: price.amount, currency: price.currency };
}
