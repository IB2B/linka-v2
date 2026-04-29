"use client";

import { Lightbulb } from "lucide-react";

import type { TopicSuggestion } from "@/types/content";

type Props = {
  suggestion: TopicSuggestion;
  disabled: boolean;
  onClick: () => void;
};

export function SuggestionItem({ suggestion, disabled, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex w-full items-start gap-3 rounded-md border bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Lightbulb className="size-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-medium leading-snug group-hover:text-primary">
          {suggestion.topic}
        </p>
        {suggestion.reasoning ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {suggestion.reasoning}
          </p>
        ) : null}
      </div>
    </button>
  );
}
