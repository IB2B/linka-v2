import type { BillingPlan } from "@/types/billing-plan";

// Feature lines mirror `landing.pricing.plans` in the message files — keep the
// two in step. Enforced in code: the monthly post count, the daily image and
// video caps, video on paid plans only, and the inbox/trends/analytics gate.
export const BILLING_PLANS: readonly BillingPlan[] = [
  {
    id: "starter",
    name: "Free",
    priceKind: "free",
    description: "Try the engine. No card needed.",
    features: [
      "5 AI posts / month",
      "All 10 platforms",
      "AI images — up to 20 / day",
      "Voice Lab & brand kit",
      "Calendar & scheduling",
      "Unlimited text regenerations",
    ],
  },
  {
    id: "pro",
    name: "Creator",
    priceKind: "paid",
    description: "Everything a solo creator needs to ship consistently.",
    features: [
      "30 AI posts / month",
      "AI images — up to 20 / day",
      "Avatar video — up to 3 / day",
      "Per-platform goal, tone & post types",
      "23 languages, written natively",
      "Pipeline for inbound DMs",
      "Unlimited text regenerations",
      "Email support",
    ],
  },
  {
    id: "scale",
    name: "Business",
    priceKind: "paid",
    description: "For operators who post daily and want the numbers.",
    features: [
      "150 AI posts / month",
      "AI images — up to 20 / day",
      "Avatar video — up to 3 / day",
      "DM inbox & comment replies",
      "Trend Radar with hook angles",
      "Full analytics, down to each post",
      "Everything in Creator",
      "Priority support",
    ],
    highlighted: true,
    badge: "Most popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceKind: "custom",
    description: "For agencies and large teams with custom needs.",
    cta: "contact",
    contactHref: "mailto:sales@linka.studio",
    features: [
      "Custom post, image & video limits",
      "Onboarding done with you",
      "Admin controls & audit trail",
      "Dedicated account manager",
      "Custom SLA",
    ],
  },
];

// Shown under the plan grid; mirrors `landing.pricing.footnote`.
export const PLAN_FOOTNOTE =
  "1 post = 1 platform version — a post for LinkedIn and X uses 2. Regenerating text is free. "
  + "Post limits reset on the 1st of each month; image and video limits every 24 hours.";
