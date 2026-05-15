export type Row = {
  label: string;
  linka: string;
  agency: string;
  diy: string;
};

export const COMPARISON: Row[] = [
  { label: "Monthly cost",         linka: "$29",                         agency: "$2,000+",              diy: "$0 + 20 h/week" },
  { label: "AI posts per month",   linka: "100 (Creator)",               agency: "3–5 manually",         diy: "If you have time" },
  { label: "Connected accounts",   linka: "Unlimited",                   agency: "What you pay for",     diy: "Manual per app" },
  { label: "On-brand voice",       linka: "Trained on your content",     agency: "Eventually, maybe",    diy: "Yes — that's the bottleneck" },
  { label: "Image generation",     linka: "Included",                    agency: "Charged separately",   diy: "Canva chaos" },
  { label: "Analytics & DMs",      linka: "All in one dashboard",        agency: "Separate tools",       diy: "5 different apps" },
  { label: "Auto-scheduling",      linka: "Optimal slots per platform",  agency: "Manual",               diy: "Manual" },
  { label: "Reply automation",     linka: "Drafts every comment & DM",   agency: "Not their job",        diy: "You, at midnight" },
  { label: "Time to first post",   linka: "Under 5 minutes",             agency: "2–4 weeks",            diy: "Tomorrow, probably" },
];
