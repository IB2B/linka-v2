import { Link as LinkIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { FeedbackStatusBadge } from "@/components/admin/feedback/feedback-status-badge";
import { FeedbackCategoryBadge } from "@/components/admin/feedback/feedback-category-badge";
import { FeedbackAuthor } from "@/components/admin/feedback/feedback-author";
import { FeedbackActions } from "@/components/admin/feedback/feedback-actions";
import { formatRelative } from "@/lib/admin/format-relative";
import type { FeedbackRow } from "@/types/admin-feedback";

export function FeedbackCard({ row }: { row: FeedbackRow }) {
  return (
    <Card size="sm" className="gap-4 px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <FeedbackCategoryBadge category={row.category} />
          <FeedbackStatusBadge status={row.status} />
        </div>
        <span
          className="text-xs tabular-nums tracking-tight text-muted-foreground"
          title={new Date(row.createdAt).toLocaleString()}
        >
          {formatRelative(row.createdAt)}
        </span>
      </div>

      <blockquote className="border-l-2 pl-3 text-sm tracking-tight whitespace-pre-wrap text-foreground/90">
        {row.message}
      </blockquote>

      {row.pageUrl ? (
        <div className="inline-flex items-center gap-1.5 text-xs tracking-tight text-muted-foreground">
          <LinkIcon className="size-3" />
          <span className="truncate">{row.pageUrl}</span>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <FeedbackAuthor user={row.user} />
        <FeedbackActions id={row.id} status={row.status} />
      </div>
    </Card>
  );
}
