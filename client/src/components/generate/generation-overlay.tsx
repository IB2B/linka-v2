"use client";

import { Sparkles } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";

export function GenerationOverlay({ label }: { label: string }) {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:bottom-6">
      <div className="flex max-w-[90vw] items-center gap-3 rounded-full border bg-popover px-4 py-2.5 shadow-lg ring-1 ring-foreground/5">
        <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-4" />
          <span className="absolute -inset-1 animate-ping rounded-full bg-primary/20" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium">Generating…</p>
          <p className="truncate text-xs text-muted-foreground">{label}</p>
        </div>
        <Spinner aria-hidden className="ml-1" />
      </div>
    </div>
  );
}
