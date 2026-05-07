export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  gradient: string;
  metric?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "I cancelled my $2.4k/mo agency in week two. Linka outperforms them on every metric and never misses a Monday post.",
    name: "Maya R.",
    role: "Founder, Stitchwave",
    gradient: "from-rose-300 to-fuchsia-400",
    metric: "+184% reach",
  },
  {
    quote: "It nails my voice scary-well. Three of my last five viral hooks were Linka drafts I barely edited.",
    name: "Devon K.",
    role: "Solo SaaS, indie hacker",
    gradient: "from-violet-300 to-sky-400",
    metric: "12.3k → 41k",
  },
  {
    quote: "The Inbox Autopilot is the killer feature. I haven't typed a comment reply in 6 weeks and replies are up.",
    name: "Priya S.",
    role: "Coach &amp; creator",
    gradient: "from-amber-300 to-rose-400",
    metric: "4.2x replies",
  },
];
