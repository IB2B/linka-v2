"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";

import { Card } from "@/components/ui/card";
import { FeedbackRowItem } from "@/components/admin/feedback/feedback-row";
import { FeedbackCard } from "@/components/admin/feedback/feedback-card";
import { FeedbackDetailSheet } from "@/components/admin/feedback/feedback-detail-sheet";
import { FeedbackViewToggle, type FeedbackView } from "@/components/admin/feedback/feedback-view-toggle";
import type { FeedbackRow } from "@/types/admin-feedback";

export function FeedbackList({ rows }: { rows: FeedbackRow[] }) {
  const [view, setView] = useState<FeedbackView>("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = rows.find((r) => r.id === selectedId) ?? null;

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
    <div className="space-y-3">
      <div className="flex items-center justify-end">
        <FeedbackViewToggle value={view} onChange={setView} />
      </div>
      {view === "list" ? (
        <Card size="sm" className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <tbody>
                {rows.map((r) => (
                  <FeedbackRowItem
                    key={r.id}
                    row={r}
                    active={selectedId === r.id}
                    onOpen={() => setSelectedId(r.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {rows.map((r) => (
            <FeedbackCard
              key={r.id}
              row={r}
              active={selectedId === r.id}
              onOpen={() => setSelectedId(r.id)}
            />
          ))}
        </div>
      )}
      {selected && (
        <FeedbackDetailSheet
          key={selected.id}
          row={selected}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
