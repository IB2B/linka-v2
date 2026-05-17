"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCOUNT_FILTER_TABS, type AccountFilter } from "./account-filter-tabs";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  filter: AccountFilter;
  onFilter: (f: AccountFilter) => void;
  counts: Record<AccountFilter, number>;
};

export function AccountsFilters({ search, onSearch, filter, onFilter, counts }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search platforms"
          className="h-10 w-full rounded-lg border bg-card pl-9 pr-3 text-sm outline-none transition-colors focus:border-foreground/30"
        />
      </div>
      <div className="flex items-center gap-1">
        {ACCOUNT_FILTER_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => onFilter(t.key)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              filter === t.key
                ? "bg-foreground/5 font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}{" "}
            <span className="text-xs tabular-nums opacity-60">{counts[t.key]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
