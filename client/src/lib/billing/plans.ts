import type { BillingPlan } from "@/types/billing-plan";

// Feature lines mirror `landing.pricing.plans` in the message files — keep the
// two in step. Only the monthly post count and the inbox/trends/analytics gate
// are enforced in code (see plan-features.ts); nothing here promises more.
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
    ],
  },
  {
    id: "pro",
    name: "Creator",
    priceKind: "paid",
    description: "Everything a solo creator needs to ship consistently.",
    features: [
      "30 AI posts / month",
      "Per-platform goal, tone & post types",
      "23 languages, written natively",
      "AI images + avatar video",
      "Pipeline for inbound DMs",
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
