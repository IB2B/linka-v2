"use client";

import { Link as LinkIcon } from "lucide-react";

import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { FeedbackCategoryBadge } from "@/components/admin/feedback/feedback-category-badge";
import { FeedbackStatusBadge } from "@/components/admin/feedback/feedback-status-badge";
import { FeedbackAuthor } from "@/components/admin/feedback/feedback-author";
import { FeedbackActions } from "@/components/admin/feedback/feedback-actions";
import { formatRelative } from "@/lib/admin/format-relative";
import type { FeedbackRow } from "@/types/admin-feedback";

type Props = { row: FeedbackRow; onClose: () => void };

export function FeedbackDetailSheet({ row, onClose }: Props) {
  return (
    <Sheet open onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="border-b">
          <div className="flex flex-wrap items-center gap-2">
            <FeedbackCategoryBadge category={row.category} />
            <FeedbackStatusBadge status={row.status} />
            <span
              className="ml-auto text-xs tabular-nums tracking-tight text-muted-foreground"
              title={new Date(row.createdAt).toLocaleString("en-US")}
              suppressHydrationWarning
            >
              {formatRelative(row.createdAt)}
            </span>
          </div>
          <SheetTitle className="sr-only">Feedback details</SheetTitle>
          <SheetDescription className="sr-only">
            Full feedback message and triage actions.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-5 px-4 pb-6 pt-4">
          <blockquote className="rounded-lg border-l-2 bg-muted/30 px-3 py-2.5 text-sm tracking-tight whitespace-pre-wrap text-foreground/90">
            {row.message}
          </blockquote>
          {row.pageUrl ? (
            <div className="inline-flex items-center gap-1.5 text-xs tracking-tight text-muted-foreground">
              <LinkIcon className="size-3" />
              <span className="truncate">{row.pageUrl}</span>
            </div>
          ) : null}
          <div className="border-t pt-4">
            <FeedbackAuthor user={row.user} />
          </div>
          <div className="border-t pt-4">
            <FeedbackActions id={row.id} status={row.status} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
