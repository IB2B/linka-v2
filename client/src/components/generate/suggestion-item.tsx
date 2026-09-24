"use client";

import { Lightbulb } from "lucide-react";

import { SelectDot } from "./select-dot";
import { cn } from "@/lib/utils";
import type { TopicSuggestion } from "@/types/content";

type Props = {
  suggestion: TopicSuggestion;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
};

export function SuggestionItem({ suggestion, selected, disabled, onClick }: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group flex w-full items-start gap-3 rounded-md border bg-card p-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "hover:border-primary/50 hover:bg-muted/40",
      )}
    >
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Lightbulb className="size-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <p className={cn("font-medium leading-snug", selected ? "text-primary" : "group-hover:text-primary")}>
          {suggestion.topic}
        </p>
        {suggestion.reasoning ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {suggestion.reasoning}
          </p>
        ) : null}
      </div>
      <SelectDot selected={selected} />
    </button>
  );
}
