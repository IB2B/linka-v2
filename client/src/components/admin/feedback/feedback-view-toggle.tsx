"use client";

import { LayoutGrid, List } from "lucide-react";

import { cn } from "@/lib/utils";

export type FeedbackView = "list" | "cards";

type Props = { value: FeedbackView; onChange: (v: FeedbackView) => void };

const OPTIONS: { id: FeedbackView; label: string; Icon: typeof List }[] = [
  { id: "list",  label: "List",  Icon: List },
  { id: "cards", label: "Cards", Icon: LayoutGrid },
];

export function FeedbackViewToggle({ value, onChange }: Props) {
  return (
    <div role="tablist" aria-label="View mode" className="inline-flex items-center gap-0.5 rounded-lg border bg-card p-0.5">
      {OPTIONS.map(({ id, label, Icon }) => {
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`${label} view`}
            onClick={() => onChange(id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium tracking-tight transition-colors",
              active
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
