export type PlanTier = "starter" | "pro" | "scale" | "enterprise";

export type PlanCta = "checkout" | "contact";

// "free" -> €0, "custom" -> Enterprise (contact sales), "paid" -> price comes
// live from Stripe. No plan hardcodes an amount.
export type PlanPriceKind = "free" | "paid" | "custom";

export type BillingPlan = {
  id: PlanTier;
  name: string;
  priceKind: PlanPriceKind;
  description: string;
  features: readonly string[];
  cta?: PlanCta;
  contactHref?: string;
  highlighted?: boolean;
  badge?: string;
};
