import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { nextDir, type SortDir, type SortKey } from "@/lib/admin/users-sort";

type Props = {
  label: string;
  sortKey: SortKey;
  current?: SortKey;
  dir?: SortDir;
  params: Record<string, string | undefined>;
  align?: "left" | "right";
  className?: string;
};

function buildHref(params: Record<string, string | undefined>, sortKey: SortKey, dir: SortDir): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v && k !== "sort" && k !== "dir") qs.set(k, v);
  }
  qs.set("sort", sortKey);
  qs.set("dir", dir);
  return `/admin/users?${qs.toString()}`;
}

export function SortableTh({ label, sortKey, current, dir, params, align = "left", className }: Props) {
  const active = current === sortKey;
  const next = nextDir(current, sortKey, dir);
  const Icon = !active ? ArrowUpDown : dir === "asc" ? ArrowUp : ArrowDown;

  return (
    <th className={cn("px-4 py-3", className)}>
      <Link
        href={buildHref(params, sortKey, next)}
        scroll={false}
        className={cn(
          "inline-flex items-center gap-1 rounded text-xs font-medium tracking-tight transition",
          align === "right" && "justify-end",
          active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        )}
      >
        <span>{label}</span>
        <Icon className={cn("size-3", !active && "opacity-50")} aria-hidden />
      </Link>
    </th>
  );
}
