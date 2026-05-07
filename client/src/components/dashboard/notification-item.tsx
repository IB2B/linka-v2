import Link from "next/link";
import { AlertTriangle, Calendar, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Notification, NotificationKind } from "./notifications-data";

const ICONS: Record<NotificationKind, LucideIcon> = {
  failed: AlertTriangle,
  upcoming: Calendar,
  posted: Calendar,
};

const TONES: Record<NotificationKind, string> = {
  failed: "bg-destructive/10 text-destructive",
  upcoming: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  posted: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
};

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.round(ms / 60_000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.round(h / 24)}d`;
}

export function NotificationItem({ n }: { n: Notification }) {
  const Icon = ICONS[n.kind];
  return (
    <Link
      href={n.href}
      className="flex items-start gap-3 rounded-md px-3 py-2.5 hover:bg-accent"
    >
      <div className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full", TONES[n.kind])}>
        <Icon className="size-3.5" />
      </div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm font-medium leading-tight">{n.title}</p>
        <p className="truncate text-xs text-muted-foreground">{n.body}</p>
      </div>
      <span className="shrink-0 text-[10px] text-muted-foreground">
        {timeAgo(n.at)}
      </span>
    </Link>
  );
}
