export type PlanTier = "starter" | "pro" | "scale" | "enterprise";

export type PlanCta = "checkout" | "contact";

export type BillingPlan = {
  id: PlanTier;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: readonly string[];
  cta?: PlanCta;
  contactHref?: string;
  highlighted?: boolean;
  badge?: string;
};
