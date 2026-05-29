import { Rocket, Mic, Building2, LineChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type UseCase = {
  icon: LucideIcon;
  title: string;
  body: string;
  bullets: string[];
};

export const USE_CASES: UseCase[] = [
  {
    icon: Rocket,
    title: "Founders & solo SaaS",
    body: "Ship product, ship posts. One workflow for both.",
    bullets: [
      "Hooks pulled from your changelog",
      "Build-in-public threads on autopilot",
      "Lead capture across LinkedIn + X",
    ],
  },
  {
    icon: Mic,
    title: "Creators & coaches",
    body: "Show up daily without burning out on Canva.",
    bullets: [
      "Voice trained on your best posts",
      "Carousels and reels in one click",
      "Inbox autopilot for DMs",
    ],
  },
  {
    icon: Building2,
    title: "Agencies",
    body: "Run more clients without hiring more writers.",
    bullets: [
      "Brand kits and voice per workspace",
      "Approval flows with team seats",
      "White-label exports — PDF + CSV",
    ],
  },
  {
    icon: LineChart,
    title: "Marketing teams",
    body: "A real content engine. Not another tool.",
    bullets: [
      "Calendar across 8 platforms",
      "Analytics that tune the next post",
      "SSO, audit logs, role-based access",
    ],
  },
];
