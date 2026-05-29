import type { ComponentType } from "react";

import { TourMockVoice } from "./tour-mock-voice";
import { TourMockCalendar } from "./tour-mock-calendar";
import { TourMockInbox } from "./tour-mock-inbox";
import { TourMockRadar } from "./tour-mock-radar";

export type TourCard = {
  id: string;
  tag: string;
  title: string;
  body: string;
  Mock: ComponentType;
  span?: "lg" | "md";
};

export const TOUR: TourCard[] = [
  {
    id: "voice",
    tag: "Voice Lab",
    title: "Sounds like you. Always.",
    body: "Linka studies your past posts, hooks and CTAs. Every draft reads like your best Tuesday — never like AI.",
    Mock: TourMockVoice,
    span: "lg",
  },
  {
    id: "calendar",
    tag: "Calendar",
    title: "One calendar. Every platform.",
    body: "LinkedIn, X, Instagram, TikTok and more on a single grid. Optimal slots picked per channel.",
    Mock: TourMockCalendar,
    span: "md",
  },
  {
    id: "inbox",
    tag: "Inbox",
    title: "Replies that draft themselves.",
    body: "Every comment and DM gets an AI-drafted reply in your tone. You review, it sends.",
    Mock: TourMockInbox,
    span: "md",
  },
  {
    id: "radar",
    tag: "Radar",
    title: "Be first, not late.",
    body: "Linka surfaces trending topics in your niche before they peak — with hook angles ready to ship.",
    Mock: TourMockRadar,
    span: "lg",
  },
];
