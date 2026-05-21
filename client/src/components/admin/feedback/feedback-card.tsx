"use client";

import { type KeyboardEvent } from "react";
import { Link as LinkIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { FeedbackCategoryBadge } from "@/components/admin/feedback/feedback-category-badge";
import { FeedbackStatusBadge } from "@/components/admin/feedback/feedback-status-badge";
import { FeedbackAuthor } from "@/components/admin/feedback/feedback-author";
import { formatRelative } from "@/lib/admin/format-relative";
import type { FeedbackRow } from "@/types/admin-feedback";

type Props = { row: FeedbackRow; active?: boolean; onOpen: () => void };

export function FeedbackCard({ row, active, onOpen }: Props) {
  const isNew = row.status === "new";

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); }
  }

  return (
    <Card
      size="sm"
      role="button"
      tabIndex={0}
      aria-label="Open feedback details"
      onClick={onOpen}
      onKeyDown={onKeyDown}
      className={cn(
        "cursor-pointer gap-3 px-5 py-4 transition hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none",
        active && "bg-muted/50 ring-1 ring-ring/30",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <FeedbackCategoryBadge category={row.category} />
          <FeedbackStatusBadge status={row.status} />
        </div>
        <span
          className="text-xs tabular-nums tracking-tight text-muted-foreground"
          title={new Date(row.createdAt).toLocaleString("en-US")}
          suppressHydrationWarning
        >
          {formatRelative(row.createdAt)}
        </span>
      </div>

      <p className={cn(
        "line-clamp-3 text-sm tracking-tight whitespace-pre-wrap",
        isNew ? "font-medium text-foreground" : "text-foreground/85",
      )}>
        {row.message}
      </p>

      {row.pageUrl ? (
        <div className="inline-flex items-center gap-1.5 text-xs tracking-tight text-muted-foreground">
          <LinkIcon className="size-3" />
          <span className="truncate">{row.pageUrl}</span>
        </div>
      ) : null}

      <div className="border-t pt-3">
        <FeedbackAuthor user={row.user} />
      </div>
    </Card>
  );
}
