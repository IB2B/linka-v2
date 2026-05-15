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
    body: "Trained on your content. Every hook, CTA and format sounds like you wrote it on your best day — not like AI." },
  { icon: ImageIcon, tone: "rose", title: "Generates the visuals",
    body: "On-brand images and carousels created alongside the copy. No Canva, no designer, no extra tab." },
  { icon: CalendarClock, tone: "violet", title: "Schedules everywhere",
    body: "One calendar for LinkedIn, Instagram, X, TikTok, Pinterest and more. Posts go out at the best slot per platform." },
  { icon: Radar, tone: "amber", title: "Trend Radar",
    body: "Surfaces trending topics in your niche before they peak. Be first, not late." },
  { icon: Inbox, tone: "sky", title: "Inbox Autopilot",
    body: "AI-drafted replies to every comment and DM. You review, it sends. Inbox zero, every day." },
  { icon: BarChart3, tone: "emerald", title: "Analytics that act",
    body: "Learns which hooks, times and formats drive results — then writes more of what actually works." },
];
