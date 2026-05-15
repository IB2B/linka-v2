export type StepMeta = {
  headline: string;
  subtext: string;
  bullets: string[];
};

export const STEP_META: readonly StepMeta[] = [
  {
    headline: "Personalized from day one",
    subtext:
      "Your background helps us craft content that sounds genuinely like you — not a chatbot.",
    bullets: [
      "Industry-specific topics",
      "Tone matched to your role",
      "Smart hashtag suggestions",
    ],
  },
  {
    headline: "Post everywhere at once",
    subtext:
      "One dashboard to schedule and publish across all your social platforms.",
    bullets: [
      "8+ platforms supported",
      "Schedule weeks in advance",
      "Analytics per platform",
    ],
  },
  {
    headline: "Your voice, not a template",
    subtext:
      "Linka reads your existing posts and writes new ones in the same natural style.",
    bullets: [
      "Trained on your own content",
      "Adapts per platform",
      "Gets smarter over time",
    ],
  },
  {
    headline: "Start free, scale when ready",
    subtext:
      "No credit card required. Upgrade whenever you need more posts.",
    bullets: [
      "10 AI posts / month on Free",
      "Unlimited on Creator+",
      "Cancel any time",
    ],
  },
];

export const STEP_LABELS = ["Profile", "Connect", "Style", "Plan"] as const;
