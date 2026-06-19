export type PlanPrice = { amount: number; currency: string; interval: string };

// Tier id -> live Stripe price. Only paid tiers (pro, scale) appear here.
export type PlanPrices = Record<string, PlanPrice>;
