import type { BillingPlan } from "@/types/billing-plan";

export const BILLING_PLANS: readonly BillingPlan[] = [
  {
    id: "starter",
    name: "Free",
    price: "$0",
    cadence: "/month",
    description: "Try it free. No card needed.",
    features: [
      "10 AI posts / month",
      "5 AI images / month",
      "1 connected account",
      "Basic scheduling",
    ],

  },
  {
    id: "pro",
    name: "Creator",
    price: "$29",
    cadence: "/month",
    description: "Everything you need to grow on every platform.",
    features: [
      "100 AI posts / month",
      "30 AI images / month",
      "Unlimited connected accounts",
      "All platforms (LinkedIn, Instagram, X, TikTok, Pinterest, Threads, YouTube Shorts, Facebook)",
      "Analytics dashboard",
      "DM inbox & comment replies",
      "Optimal-slot auto-scheduling",
      "Voice training on your writing style",
    ],
    highlighted: true,
  },
  {
    id: "scale",
    name: "Pro",
    price: "$79",
    cadence: "/month",
    description: "For teams shipping across multiple brands.",
    features: [
      "500 AI posts / month",
      "150 AI images / month",
      "Everything in Creator",
      "Team seats & approvals",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$199",
    cadence: "/month",
    description: "For agencies managing clients at scale.",
    features: [
      "2,000 AI posts / month",
      "500 AI images / month",
      "Everything in Pro",
      "Dedicated account manager",
      "Custom onboarding",
    ],
  },
];
