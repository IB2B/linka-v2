"use client";

import { useState, useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { refreshTrendsAction } from "@/app/dashboard/trends/actions";
import { SUGGESTED_TOPICS } from "@/lib/trends/suggested-topics";

export function TopicPicker() {
  const [topic, setTopic] = useState("");
  const [pending, start] = useTransition();

  function refresh(value?: string) {
    const t = (value ?? topic).trim();
    start(async () => {
      const r = await refreshTrendsAction(t || undefined);
      if ("error" in r) toast.error(r.error);
      else toast.success(`Found ${r.refreshed} trends${t ? ` about ${t}` : ""}`);
    });
  }

  return (
    <div className="space-y-3 rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          placeholder="What do you want trends about? e.g. AI agents, fintech, indie hacking…"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") refresh(); }}
          disabled={pending}
        />
        <Button onClick={() => refresh()} disabled={pending}>
          {pending ? <Spinner aria-hidden /> : <RefreshCw className="size-4" />}
          {pending ? "Scanning…" : "Refresh"}
        </Button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTED_TOPICS.map((s) => (
          <button
            key={s}
            type="button"
            disabled={pending}
            onClick={() => { setTopic(s); refresh(s); }}
            className="rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
