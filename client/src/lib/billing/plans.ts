import type { BillingPlan } from "@/types/billing-plan";

export const BILLING_PLANS: readonly BillingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$19",
    cadence: "/month",
    description: "For solo creators getting started.",
    features: [
      "30 AI posts / month",
      "10 AI images / month",
      "1 connected account",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    cadence: "/month",
    description: "For active creators shipping every day.",
    features: [
      "200 AI posts / month",
      "100 AI images / month",
      "5 connected accounts",
      "Calendar & scheduling",
    ],
    highlighted: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: "$129",
    cadence: "/month",
    description: "For teams and agencies running at volume.",
    features: [
      "Unlimited AI posts",
      "500 AI images / month",
      "Unlimited connected accounts",
      "Priority support",
    ],
  },
];
