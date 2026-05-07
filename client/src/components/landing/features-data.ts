import { Wand2, Image as ImageIcon, CalendarClock, BarChart3, Inbox, Radar } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
  tone: "rose" | "violet" | "emerald" | "amber" | "sky" | "fuchsia";
};

export const FEATURES: Feature[] = [
  { icon: Wand2, tone: "fuchsia", title: "Writes in your voice",
    body: "Trained on your past posts. Hooks, CTAs, formatting — all you, none of the AI tells." },
  { icon: ImageIcon, tone: "rose", title: "Designs the image",
    body: "On-brand carousels and feed images generated alongside the copy. No Canva tab needed." },
  { icon: CalendarClock, tone: "violet", title: "Schedules everywhere",
    body: "LinkedIn, Instagram, X, TikTok, Pinterest — one calendar, one queue, optimal time-slots." },
  { icon: Radar, tone: "amber", title: "Trend Radar",
    body: "Surfaces trending topics in your niche before they peak so you ride the wave, not the wake." },
  { icon: Inbox, tone: "sky", title: "Inbox Autopilot",
    body: "Drafts on-brand replies to every comment & DM. You approve, it sends. Inbox zero, finally." },
  { icon: BarChart3, tone: "emerald", title: "Analytics that act",
    body: "Knows which hook, time and platform converted — and writes more of what works." },
];
