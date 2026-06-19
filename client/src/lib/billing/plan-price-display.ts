import { formatMoney } from "./format";
import type { BillingPlan } from "@/types/billing-plan";
import type { PlanPrices } from "@/types/plan-prices";

// Turns a catalog plan + live Stripe prices into display strings. Paid amounts
// always come from Stripe; free/custom are semantic labels (not Stripe-managed).
export function planPriceDisplay(
  plan: BillingPlan, prices: PlanPrices,
): { price: string; cadence: string } {
  if (plan.priceKind === "free") return { price: "€0", cadence: "free forever" };
  if (plan.priceKind === "custom") return { price: "Custom", cadence: "pricing" };
  const p = prices[plan.id];
  if (!p) return { price: "—", cadence: "" };
  return { price: formatMoney(p.amount, p.currency), cadence: `/${p.interval}` };
}
