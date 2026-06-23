import {
  AlertTriangle, Calendar, Heart, LifeBuoy, MessageCircle, Sparkles,
  type LucideIcon,
} from "lucide-react";

import type { NotificationKind } from "./notifications-data";

export const KIND_ICONS: Record<NotificationKind, LucideIcon> = {
  failed: AlertTriangle, upcoming: Calendar, posted: Calendar, ticket: LifeBuoy,
  likes: Heart, comments: MessageCircle, generated: Sparkles,
};

export const KIND_TONES: Record<NotificationKind, string> = {
  failed: "bg-destructive/10 text-destructive",
  upcoming: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  posted: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  ticket: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  likes: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
  comments: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  generated: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
};
