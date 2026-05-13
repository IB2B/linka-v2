"use client";

import Link from "next/link";
import { MoreHorizontal, ExternalLink, BellOff, Trash2, CheckCheck } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { InboxAvatar } from "./inbox-avatar";
import { PlatformBadge } from "./platform-badge";
import { platformColor } from "./platform-color";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { Conversation } from "@/lib/inbox/inbox.types";

function formatRelative(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

type Props = { conversation: Conversation; active: boolean; hrefSuffix: string };

export function ConversationRow({ conversation: c, active, hrefSuffix }: Props) {
  const color = platformColor(c.platform);
  const badgeStyle = color ? { backgroundColor: color, borderColor: color, color: "#fff" } : undefined;

  return (
    <div className={cn("group relative flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors cursor-pointer", active ? "bg-accent" : "hover:bg-accent/50")}>
      <Link href={`/dashboard/inbox/${encodeURIComponent(c.id)}${hrefSuffix}`} className="absolute inset-0 rounded-lg" />
      <div className="relative shrink-0 pointer-events-none">
        <InboxAvatar name={c.participantName} src={c.participantAvatar} username={c.participantUsername} platform={c.platform} />
        <span style={badgeStyle} className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full border-2 border-background bg-muted text-muted-foreground shadow-sm">
          <PlatformBadge platform={c.platform} className="size-2.5" />
        </span>
      </div>
      <div className="relative min-w-0 flex-1 pointer-events-none">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">{c.participantName}</p>
          <span className="shrink-0 text-[10px] text-muted-foreground">{formatRelative(c.lastMessageAt)}</span>
        </div>
        <p className={cn("truncate text-xs", c.unread ? "font-medium text-foreground" : "text-muted-foreground")}>
          {c.lastMessageDirection === "outgoing" ? <span className="text-muted-foreground">You: </span> : null}
          {c.lastMessage || "—"}
        </p>
      </div>
      {c.unread && !active ? (
        <span className="relative mt-1.5 size-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] pointer-events-none" aria-label="Unread" />
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger
          className="relative z-10 ml-auto shrink-0 flex size-6 items-center justify-center rounded-md opacity-0 transition-opacity group-hover:opacity-100 hover:bg-muted"
          aria-label="Conversation options"
        >
          <MoreHorizontal className="size-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => window.open(c.url ?? "#", "_blank")}>
            <ExternalLink className="size-3.5" /> Open in app
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.info("Mark as read — coming soon")}>
            <CheckCheck className="size-3.5" /> Mark as read
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.info("Mute — coming soon")}>
            <BellOff className="size-3.5" /> Mute
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.info("Delete — coming soon")} className="text-destructive focus:text-destructive">
            <Trash2 className="size-3.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
