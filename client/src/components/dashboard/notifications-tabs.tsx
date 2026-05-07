"use client";

import { cn } from "@/lib/utils";
import type {
  Notification, NotificationFilter,
} from "./notifications-data";

type Props = {
  list: Notification[];
  value: NotificationFilter;
  onChange: (v: NotificationFilter) => void;
};

const TABS: { value: NotificationFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "failed", label: "Failed" },
  { value: "upcoming", label: "Upcoming" },
];

function countOf(list: Notification[], v: NotificationFilter): number {
  if (v === "all") return list.length;
  return list.filter((n) => n.kind === v).length;
}

export function NotificationsTabs({ list, value, onChange }: Props) {
  return (
    <div className="flex gap-0.5 border-b px-1.5 py-1.5">
      {TABS.map((t) => {
        const c = countOf(list, t.value);
        const active = value === t.value;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={cn(
              "flex-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
              active
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
          >
            {t.label}
            {c > 0 ? (
              <span className={cn(
                "ml-1 rounded px-1 text-[10px] font-semibold tabular-nums",
                active ? "bg-background text-foreground" : "bg-muted text-muted-foreground",
              )}>
                {c}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
