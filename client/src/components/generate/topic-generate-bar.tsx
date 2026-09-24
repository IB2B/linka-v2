"use client";

import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = { label: string | null; pending: boolean; onGenerate: () => void };

// Picking a topic only selects it; this is the one place that starts a
// generation, so a stray click never spends a post from the monthly quota.
export function TopicGenerateBar({ label, pending, onGenerate }: Props) {
  return (
    <div className="sticky bottom-0 -mx-6 mt-4 flex flex-col gap-3 border-t bg-card/95 px-6 py-3 backdrop-blur sm:flex-row sm:items-center">
      <p className="min-w-0 flex-1 truncate text-sm">
        {label ? (
          <>
            <span className="text-muted-foreground">Selected: </span>
            <span className="font-medium">{label}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Pick one topic above.</span>
        )}
      </p>
      <Button onClick={onGenerate} disabled={!label || pending} className="sm:shrink-0">
        {pending ? <Spinner aria-hidden /> : <Sparkles className="size-4" />}
        Generate post
      </Button>
    </div>
  );
}
