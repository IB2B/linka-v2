export type Row = {
  label: string;
  linka: string;
  agency: string;
  diy: string;
};

export const COMPARISON: Row[] = [
  { label: "Monthly cost", linka: "$29", agency: "$2,000+", diy: "$0 + 20h/week" },
  { label: "Posts per week", linka: "Unlimited", agency: "3–5", diy: "If you have time" },
  { label: "On-brand voice", linka: "Trained on you", agency: "Eventually, maybe", diy: "Yes — that&rsquo;s the bottleneck" },
  { label: "Image generation", linka: "Included", agency: "$$$ extra", diy: "Canva chaos" },
  { label: "Auto-scheduling", linka: "Per-platform optimal slots", agency: "Manual", diy: "Manual" },
  { label: "Reply automation", linka: "Drafts every comment &amp; DM", agency: "Not their job", diy: "You, at midnight" },
  { label: "Time to first post", linka: "3 minutes", agency: "2–4 weeks", diy: "Tomorrow, probably" },
];
