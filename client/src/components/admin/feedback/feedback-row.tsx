"use client";

import { type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";
import { FeedbackCategoryBadge } from "@/components/admin/feedback/feedback-category-badge";
import { FeedbackStatusBadge } from "@/components/admin/feedback/feedback-status-badge";
import { formatRelative } from "@/lib/admin/format-relative";
import type { FeedbackRow } from "@/types/admin-feedback";

type Props = { row: FeedbackRow; onOpen: () => void; active?: boolean };

export function FeedbackRowItem({ row, onOpen, active }: Props) {
  const a = row.user;
  const name = a
    ? `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() || a.email || "Unknown"
    : "Anonymous";
  const isNew = row.status === "new";

  function onKeyDown(e: KeyboardEvent<HTMLTableRowElement>) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); }
  }

  return (
    <tr
      onClick={onOpen}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open feedback from ${name}`}
      className={cn(
        "cursor-pointer border-t transition focus-visible:bg-muted/40 focus-visible:outline-none hover:bg-muted/40",
        active && "bg-muted/50",
      )}
    >
      <td className="w-[1%] whitespace-nowrap px-4 py-3">
        <div className="flex items-center gap-2">
          <FeedbackCategoryBadge category={row.category} />
          <FeedbackStatusBadge status={row.status} />
        </div>
      </td>
      <td className="min-w-0 px-3 py-3">
        <div className={cn(
          "truncate text-sm tracking-tight",
          isNew ? "font-medium text-foreground" : "text-foreground/85",
        )}>
          {row.message}
        </div>
      </td>
      <td className="hidden whitespace-nowrap px-3 py-3 text-sm tracking-tight text-muted-foreground sm:table-cell">
        {name}
      </td>
      <td
        className="whitespace-nowrap px-4 py-3 text-xs tabular-nums tracking-tight text-muted-foreground"
        title={new Date(row.createdAt).toLocaleString("en-US")}
        suppressHydrationWarning
      >
        {formatRelative(row.createdAt)}
      </td>
    </tr>
  );
}
