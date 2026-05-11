"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Check, Eye, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { setFeedbackStatusAction } from "@/app/admin/feedback/actions";

type Status = "new" | "triaged" | "closed";

const LABEL: Record<Status, string> = {
  new: "Marked as new",
  triaged: "Marked as read",
  closed: "Marked closed",
};

type Props = { id: string; status: Status };

export function FeedbackActions({ id, status }: Props) {
  const [pending, start] = useTransition();
  const [busy, setBusy] = useState<Status | null>(null);

  function run(next: Status) {
    setBusy(next);
    start(async () => {
      const res = await setFeedbackStatusAction(id, next);
      setBusy(null);
      if ("error" in res) toast.error(res.error);
      else toast.success(LABEL[next]);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === "new" ? (
        <Button size="sm" variant="outline" onClick={() => run("triaged")} disabled={pending}>
          <Eye className="size-3.5" />
          {busy === "triaged" ? "Saving…" : "Mark as read"}
        </Button>
      ) : null}
      {status === "triaged" ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium tracking-tight text-emerald-700 dark:text-emerald-300">
          <Check className="size-3" />
          Read
        </span>
      ) : null}
      {status !== "closed" ? (
        <Button size="sm" variant="ghost" onClick={() => run("closed")} disabled={pending}>
          Close
        </Button>
      ) : (
        <Button size="sm" variant="ghost" onClick={() => run("new")} disabled={pending}>
          <RotateCcw className="size-3.5" />
          {busy === "new" ? "Saving…" : "Reopen"}
        </Button>
      )}
    </div>
  );
}
