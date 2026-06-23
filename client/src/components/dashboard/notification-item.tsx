import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import type { Notification } from "./notifications-data";
import { KIND_ICONS, KIND_TONES } from "./notification-kind-style";
import { NotificationPriorityPill } from "./notification-priority-pill";
import { PLATFORM_TONES } from "./notification-platform-tone";

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.round(ms / 60_000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.round(h / 24)}d`;
}

type Props = {
  n: Notification;
  onClick?: () => void;
  onMarkRead?: () => void;
};

export function NotificationItem({ n, onClick, onMarkRead }: Props) {
  const Icon = KIND_ICONS[n.kind];
  const unread = n.seen !== true;
  return (
    <Link
      href={n.href}
      onClick={onClick}
      className={cn(
        "group relative flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors",
        unread ? "bg-sky-500/[0.04] hover:bg-sky-500/[0.08]" : "hover:bg-accent",
      )}
    >
      {unread && (
        <span aria-hidden className="absolute left-1 top-3.5 size-1.5 rounded-full bg-sky-500" />
      )}
      <div className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold", n.platform ? PLATFORM_TONES[n.platform] : KIND_TONES[n.kind])}>
        {n.avatarLabel ?? (n.platform ? <PlatformIcon platform={n.platform} className="size-3.5" /> : <Icon className="size-3.5" />)}
      </div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex items-center gap-1.5">
          <p className={cn("truncate text-sm leading-tight", unread ? "font-semibold text-foreground" : "font-medium text-muted-foreground")}>
            {n.title}
          </p>
          <NotificationPriorityPill priority={n.priority} />
        </div>
        <p className="truncate text-xs text-muted-foreground">{n.body}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {timeAgo(n.at)}
        </span>
        {unread && onMarkRead && (
          <button
            type="button"
            aria-label="Mark as read"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onMarkRead(); }}
            className="grid size-5 place-items-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100 focus:opacity-100"
          >
            <Check className="size-3" />
          </button>
        )}
      </div>
    </Link>
  );
}
