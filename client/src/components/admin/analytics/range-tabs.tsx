import Link from "next/link";

import { cn } from "@/lib/utils";

const DEFAULT_OPTIONS = [7, 30, 90];

type Props = { days: number; basePath?: string; options?: number[] };

export function RangeTabs({ days, basePath = "/admin/analytics", options = DEFAULT_OPTIONS }: Props) {
  return (
    <div className="inline-flex rounded-lg border bg-card p-0.5">
      {options.map((d) => (
        <Link
          key={d}
          href={`${basePath}?days=${d}`}
          scroll={false}
          className={cn(
            "rounded-md px-3 py-1 text-xs font-medium tracking-tight transition",
            days === d
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {d} days
        </Link>
      ))}
    </div>
  );
}
