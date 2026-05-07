import { CheckCircle2, AlertTriangle, Calendar, type LucideIcon } from "lucide-react";

import type { NotificationFilter } from "./notifications-data";

const COPY: Record<NotificationFilter, { icon: LucideIcon; title: string; body: string }> = {
  all: {
    icon: CheckCircle2,
    title: "You're all caught up",
    body: "Failed publishes and posts going live in the next 24h will show up here.",
  },
  failed: {
    icon: AlertTriangle,
    title: "No failed posts",
    body: "Nice — every recent publish landed successfully.",
  },
  upcoming: {
    icon: Calendar,
    title: "Nothing scheduled soon",
    body: "Schedule a post and we'll remind you 24h before it goes live.",
  },
};

export function NotificationsEmpty({ filter }: { filter: NotificationFilter }) {
  const { icon: Icon, title, body } = COPY[filter];
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
      <div className="flex size-9 items-center justify-center rounded-full bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{body}</p>
    </div>
  );
}
