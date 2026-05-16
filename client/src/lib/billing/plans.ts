import type { BillingPlan } from "@/types/billing-plan";

export const BILLING_PLANS: readonly BillingPlan[] = [
  {
    id: "starter",
    name: "Free",
    price: "€0",
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
    price: "€19",
    cadence: "/month",
    description: "For solo creators starting out.",
    features: [
      "50 AI posts / month",
      "15 AI images / month",
      "3 platforms (LinkedIn, Instagram, X)",
      "Basic scheduling",
      "Voice training on your writing style",
    ],
  },
  {
    id: "scale",
    name: "Pro",
    price: "€49",
    cadence: "/month",
    description: "Everything you need to grow seriously.",
    features: [
      "500 AI posts / month",
      "150 AI images / month",
      "All 8 platforms (LinkedIn, Instagram, X, TikTok, Pinterest, Threads, YouTube Shorts, Facebook)",
      "DM inbox & comment replies",
      "Analytics dashboard",
      "Optimal-slot auto-scheduling",
      "Team seats & approvals",
      "Priority support",
    ],
    highlighted: true,
    badge: "Most popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "€149",
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
