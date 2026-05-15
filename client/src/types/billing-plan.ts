export type PlanTier = "starter" | "pro" | "scale" | "enterprise";

export type BillingPlan = {
  id: PlanTier;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: readonly string[];
  highlighted?: boolean;
};
