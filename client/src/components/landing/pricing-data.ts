export type Plan = {
  name: string;
  price: string;
  period: string;
  tagline: string;
  cta: string;
  highlighted?: boolean;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    period: "free forever",
    tagline: "Try the magic. No card needed.",
    cta: "Start free",
    features: [
      "5 AI posts / month",
      "2 AI images / month",
      "1 connected account",
      "Manual scheduling",
      "7-day post history",
    ],
  },
  {
    name: "Creator",
    price: "$29",
    period: "/month",
    tagline: "Everything a solo creator needs to ship consistently.",
    cta: "Start 7-day trial",
    highlighted: true,
    features: [
      "30 AI posts / month",
      "10 AI images / month",
      "3 connected accounts",
      "Voice training on your writing style",
      "Auto-scheduling &amp; content calendar",
      "Basic analytics",
    ],
  },
  {
    name: "Business",
    price: "$79",
    period: "/month",
    tagline: "For multi-brand operators and small teams.",
    cta: "Start 7-day trial",
    features: [
      "150 AI posts / month",
      "40 AI images / month",
      "Unlimited accounts — all 8 platforms",
      "DM inbox &amp; comment replies",
      "Optimal-slot auto-scheduling",
      "Team seats (up to 3) &amp; approvals",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    tagline: "For agencies and large teams with custom needs.",
    cta: "Contact sales",
    features: [
      "Unlimited posts &amp; images",
      "Unlimited team seats",
      "SSO &amp; role-based access",
      "Audit logs &amp; data export",
      "Dedicated account manager",
      "Custom SLA &amp; onboarding",
    ],
  },
];
