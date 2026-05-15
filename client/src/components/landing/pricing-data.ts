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
      "10 AI posts / month",
      "5 AI images / month",
      "1 connected account",
      "Basic scheduling",
    ],
  },
  {
    name: "Creator",
    price: "$29",
    period: "/month",
    tagline: "Everything you need to grow on every platform.",
    cta: "Start 7-day trial",
    highlighted: true,
    features: [
      "100 AI posts / month",
      "30 AI images / month",
      "Unlimited connected accounts",
      "All platforms — LinkedIn, Instagram, X, TikTok, Pinterest, Threads, YouTube Shorts, Facebook",
      "Analytics dashboard",
      "DM inbox & comment replies",
      "Optimal-slot auto-scheduling",
      "Voice training on your writing style",
    ],
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    tagline: "For teams shipping content across multiple brands.",
    cta: "Start 7-day trial",
    features: [
      "500 AI posts / month",
      "150 AI images / month",
      "Everything in Creator",
      "Team seats & approvals",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    tagline: "For agencies managing clients at scale.",
    cta: "Contact sales",
    features: [
      "2,000 AI posts / month",
      "500 AI images / month",
      "Everything in Pro",
      "Dedicated account manager",
      "Custom onboarding & SLA",
    ],
  },
];
