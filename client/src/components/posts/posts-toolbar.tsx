"use client";

import { LayoutGrid, Rows3, Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusDropdown } from "./status-dropdown";
import type { StatusFilter } from "@/lib/posts/filter-posts";

export type ViewMode = "grid" | "table";

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
  status: StatusFilter;
  onStatusChange: (s: StatusFilter) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  count: number;
  total: number;
  children?: React.ReactNode;
};

export function PostsToolbar({
  query, onQueryChange, status, onStatusChange, view, onViewChange, count, total, children,
}: Props) {
  const t = useTranslations("posts");
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative w-96 shrink-0">
        <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="pl-8"
        />
      </div>
      <StatusDropdown value={status} onChange={onStatusChange} />
      <span className="text-xs text-muted-foreground tabular-nums">{count}/{total}</span>
      <div className="ml-auto flex items-center gap-1">
        <div className="flex items-center gap-0.5 rounded-md border bg-card p-0.5">
          <Button size="icon-sm" variant={view === "grid" ? "secondary" : "ghost"}
            onClick={() => onViewChange("grid")} aria-label={t("gridView")}>
            <LayoutGrid className="size-4" />
          </Button>
          <Button size="icon-sm" variant={view === "table" ? "secondary" : "ghost"}
            onClick={() => onViewChange("table")} aria-label={t("tableView")}>
            <Rows3 className="size-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
