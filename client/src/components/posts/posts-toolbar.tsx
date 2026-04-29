"use client";

import { LayoutGrid, Rows3, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { StatusFilter } from "@/lib/posts/filter-posts";

export type ViewMode = "grid" | "table";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: "Drafts" },
  { value: "scheduled", label: "Scheduled" },
  { value: "posted", label: "Posted" },
  { value: "failed", label: "Failed" },
];

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
  status: StatusFilter;
  onStatusChange: (s: StatusFilter) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  count: number;
  total: number;
};

export function PostsToolbar({
  query, onQueryChange, status, onStatusChange, view, onViewChange, count, total,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-[220px] flex-1">
        <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search content, prompt, platform…"
          className="pl-8"
        />
      </div>
      <div className="flex flex-wrap items-center gap-1 rounded-md border bg-card p-0.5">
        {STATUS_OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onStatusChange(o.value)}
            className={cn(
              "rounded px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
              status === o.value && "bg-muted text-foreground",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      <span className="text-xs text-muted-foreground tabular-nums">
        {count}/{total}
      </span>
      <div className="ml-auto flex items-center gap-1 rounded-md border bg-card p-0.5">
        <Button size="icon-sm" variant={view === "grid" ? "secondary" : "ghost"}
          onClick={() => onViewChange("grid")} aria-label="Grid view">
          <LayoutGrid className="size-4" />
        </Button>
        <Button size="icon-sm" variant={view === "table" ? "secondary" : "ghost"}
          onClick={() => onViewChange("table")} aria-label="Table view">
          <Rows3 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
