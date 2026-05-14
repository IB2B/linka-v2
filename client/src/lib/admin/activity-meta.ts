import {
  CircleHelp,
  CreditCard,
  PenLine,
  Send,
  Star,
  UserPlus,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import type { ActivityType } from "@/types/admin";

export type Tone = "success" | "info" | "warning" | "danger";

export type ActivityMeta = { Icon: LucideIcon; tone: Tone; verb: (d: string | null) => string };

const META: Record<ActivityType, ActivityMeta> = {
  user_signup:           { Icon: UserPlus,       tone: "success", verb: () => "signed up" },
  post_generated:        { Icon: PenLine,    tone: "info",    verb: (d) => `generated a draft${d ? ` for ${d}` : ""}` },
  post_published:        { Icon: Send,       tone: "success", verb: (d) => `published to ${d ?? "a platform"}` },
  post_failed:           { Icon: XCircle,    tone: "danger",  verb: (d) => `failed to publish to ${d ?? "a platform"}` },
  subscription_started:  { Icon: CreditCard, tone: "success", verb: (d) => `started ${d ?? "a"} plan` },
  subscription_canceled: { Icon: XCircle,    tone: "danger",  verb: () => "canceled subscription" },
  ticket_opened:         { Icon: CircleHelp, tone: "info",    verb: (d) => `opened ticket: ${d ?? "—"}` },
  feedback_submitted:    { Icon: Star,       tone: "info",    verb: (d) => `submitted ${d ?? "general"} feedback` },
};

export function metaFor(type: ActivityType): ActivityMeta {
  return META[type] ?? { Icon: Sparkles, tone: "info", verb: () => type };
}

export const TONE_CLASSES: Record<Tone, string> = {
  success: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  info:    "bg-violet-50 text-violet-600 ring-violet-100",
  warning: "bg-amber-50 text-amber-600 ring-amber-100",
  danger:  "bg-rose-50 text-rose-600 ring-rose-100",
};
