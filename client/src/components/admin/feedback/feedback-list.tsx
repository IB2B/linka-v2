import { Inbox } from "lucide-react";

import { Card } from "@/components/ui/card";
import { FeedbackCard } from "@/components/admin/feedback/feedback-card";
import type { FeedbackRow } from "@/types/admin-feedback";

export function FeedbackList({ rows }: { rows: FeedbackRow[] }) {
  if (rows.length === 0) {
    return (
      <Card size="sm" className="items-center justify-center gap-3 px-6 py-16 text-center">
        <Inbox className="size-5 text-muted-foreground" />
        <p className="text-sm font-medium tracking-tight">No feedback yet</p>
        <p className="max-w-sm text-sm tracking-tight text-muted-foreground">
          Submissions from the in-app widget will appear here.
        </p>
      </Card>
    );
  }
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {rows.map((r) => <FeedbackCard key={r.id} row={r} />)}
    </div>
  );
}
