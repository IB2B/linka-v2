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
    name: "Starter",
    price: "$0",
    period: "free forever",
    tagline: "Try the magic. No card needed.",
    cta: "Start free",
    features: [
      "10 AI posts / month",
      "1 connected account",
      "Basic scheduling",
      "Community templates",
    ],
  },
  {
    name: "Creator",
    price: "$29",
    period: "/month",
    tagline: "For solo creators &amp; founders shipping daily.",
    cta: "Start 7-day trial",
    highlighted: true,
    features: [
      "Unlimited AI posts &amp; images",
      "5 connected accounts",
      "Trend Radar &amp; Inbox Autopilot",
      "Voice training on your last 90 days",
      "Optimal-slot auto-scheduling",
      "Analytics that act",
    ],
  },
  {
    name: "Studio",
    price: "$99",
    period: "/month",
    tagline: "For teams &amp; agencies running multiple brands.",
    cta: "Start 7-day trial",
    features: [
      "Everything in Creator",
      "10 brand workspaces",
      "Team seats &amp; approvals",
      "White-label client reports",
      "API + Zapier",
      "Priority support",
    ],
  },
];
