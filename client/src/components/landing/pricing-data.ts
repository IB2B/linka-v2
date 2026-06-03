export type Plan = {
  name: string;
  price: string;
  period: string;
  tagline: string;
  cta: string;
  features: string[];
  highlighted?: boolean;
};

// Which plan is highlighted — order matches `landing.pricing.plans` in the message files.
export const PLAN_HIGHLIGHTS = [false, true, false, false];
