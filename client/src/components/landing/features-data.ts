import { Wand2, Image as ImageIcon, CalendarClock, BarChart3, Inbox, Radar, RefreshCw, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
};

export const FEATURES: Feature[] = [
  { icon: Wand2,         tag: "Voice Lab",       title: "Writes in your voice",   body: "Trained on your content. Every hook, CTA and format sounds like you wrote it on your best day — not like AI." },
  { icon: ImageIcon,     tag: "Image Studio",    title: "Generates the visuals",  body: "On-brand images and carousels created alongside the copy. No Canva, no designer, no extra tab." },
  { icon: CalendarClock, tag: "Calendar",        title: "Schedules everywhere",   body: "One calendar for LinkedIn, Instagram, X, TikTok, Pinterest and more. Posts go out at the best slot per platform." },
  { icon: Radar,         tag: "Trend Radar",     title: "Trends, before they peak", body: "Surfaces trending topics in your niche before they go mainstream. Be first, not late." },
  { icon: Inbox,         tag: "Inbox",           title: "Replies on autopilot",   body: "AI-drafted replies to every comment and DM. You review, it sends. Inbox zero, every day." },
  { icon: BarChart3,     tag: "Analytics",       title: "Insights that act",      body: "Learns which hooks, times and formats drive results — then writes more of what actually works." },
  { icon: RefreshCw,     tag: "Smart Recycler",  title: "Resurfaces what worked", body: "Your top posts get fresh angles automatically — so your best ideas keep paying you back." },
  { icon: Workflow,      tag: "Pipeline",        title: "Turns posts into leads", body: "Track inbound DMs and comments as deals. From a viral hook to a closed call without a CRM swap." },
];
