"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { InboxAvatar } from "./inbox-avatar";
import { PlatformBadge } from "./platform-badge";
import { platformColor } from "./platform-color";
import { ThreadActionsMenu } from "./thread-actions-menu";
import { ThreadSummaryDialog } from "./thread-summary-dialog";
import { AddToPipelineDialog } from "./add-to-pipeline-dialog";
import { summarizeAction } from "@/app/dashboard/inbox/pipeline-actions";
import type { Conversation } from "@/lib/inbox/inbox.types";

export function ThreadHeader({ conversation: c }: { conversation: Conversation }) {
  const color = platformColor(c.platform);
  const pillStyle = color ? { color, backgroundColor: `${color}1a`, borderColor: `${color}33` } : undefined;
  const router = useRouter();
  const [summary, setSummary] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [pipelineOpen, setPipelineOpen] = useState(false);
  const [pending, start] = useTransition();
  const [refreshing, startRefresh] = useTransition();

  function handleSummarize() {
    start(async () => {
      const r = await summarizeAction(c.id, c.accountId);
      if ("error" in r) { toast.error(r.error); return; }
      setSummary(r.summary); setOpen(true);
    });
  }

  return (
    <>
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <Link
          href="/dashboard/inbox"
          aria-label="Back to conversations"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <InboxAvatar name={c.participantName} src={c.participantAvatar} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{c.participantName}</p>
          <div style={pillStyle} className="mt-0.5 inline-flex items-center gap-1.5 rounded-full border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            <PlatformBadge platform={c.platform} className="size-3" />
            <span className="capitalize">{c.platform}</span>
          </div>
        </div>
        <button
          onClick={() => startRefresh(() => { router.refresh(); })}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Refresh"
        >
          <RefreshCw className={cn("size-4", refreshing && "animate-spin")} />
        </button>
        <ThreadActionsMenu url={c.url ?? null} pending={pending} onSummarize={handleSummarize} onAddToPipeline={() => setPipelineOpen(true)} />
      </div>
      <AddToPipelineDialog open={pipelineOpen} onOpenChange={setPipelineOpen}
        contact={{ name: c.participantName, handle: c.participantUsername, platform: c.platform }} />
      <ThreadSummaryDialog open={open} onOpenChange={setOpen} summary={summary} />
    </>
  );
}
