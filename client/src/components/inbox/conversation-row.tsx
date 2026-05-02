import Link from "next/link";

import { cn } from "@/lib/utils";
import { InboxAvatar } from "./inbox-avatar";
import { PlatformBadge } from "./platform-badge";
import { platformColor } from "./platform-color";
import type { Conversation } from "@/lib/inbox/inbox.types";

function formatRelative(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

type Props = { conversation: Conversation; active: boolean; hrefSuffix: string };

export function ConversationRow({ conversation: c, active, hrefSuffix }: Props) {
  const color = platformColor(c.platform);
  const badgeStyle = color
    ? { backgroundColor: color, borderColor: color, color: "#fff" }
    : undefined;
  return (
    <Link
      href={`/dashboard/inbox/${encodeURIComponent(c.id)}${hrefSuffix}`}
      className={cn(
        "flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
        active ? "bg-accent" : "hover:bg-accent/50",
      )}
    >
      <div className="relative">
        <InboxAvatar name={c.participantName} src={c.participantAvatar} />
        <span
          style={badgeStyle}
          className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full border-2 border-background bg-muted text-muted-foreground shadow-sm"
        >
          <PlatformBadge platform={c.platform} className="size-2.5" />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">{c.participantName}</p>
          <span className="shrink-0 text-[10px] text-muted-foreground">{formatRelative(c.lastMessageAt)}</span>
        </div>
        <p className={cn("truncate text-xs", c.unread ? "font-medium text-foreground" : "text-muted-foreground")}>
          {c.lastMessage || "—"}
        </p>
      </div>
      {c.unread ? (
        <span
          className="mt-1.5 size-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
          aria-label="Unread"
        />
      ) : null}
    </Link>
  );
}
