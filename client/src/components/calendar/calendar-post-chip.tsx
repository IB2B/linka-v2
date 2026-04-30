"use client";

import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { platformColorVar } from "@/lib/calendar/platform-color";
import { statusChipClass } from "./status-chip-class";
import { timeLabel } from "@/lib/calendar/format";
import { postDate } from "@/lib/calendar/group-posts";
import { cn } from "@/lib/utils";
import type { GeneratedPost } from "@/types/post";

export function CalendarPostChip({ post }: { post: GeneratedPost }) {
  const time = timeLabel(postDate(post).toISOString());
  const preview = post.content.slice(0, 28).trim() || "Untitled";
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link
            href={`/dashboard/posts/${post.id}`}
            style={{ borderLeftColor: platformColorVar(post.platform) }}
            className={cn(
              "flex w-full items-center gap-1 truncate rounded-sm border-l-[3px] px-1.5 py-0.5 text-left text-[11px] leading-tight transition hover:translate-x-px hover:opacity-90",
              statusChipClass(post.status),
            )}
          />
        }
      >
        <span className="font-medium tabular-nums">{time}</span>
        <span className="truncate">{preview}</span>
      </TooltipTrigger>
      <TooltipContent side="top">
        <span className="font-medium capitalize">
          {post.platform ?? "No platform"}
        </span>
        <span className="opacity-60">·</span>
        <span className="capitalize">{post.status}</span>
      </TooltipContent>
    </Tooltip>
  );
}
