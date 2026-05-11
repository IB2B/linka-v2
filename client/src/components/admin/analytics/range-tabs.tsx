import Link from "next/link";

import { cn } from "@/lib/utils";

const OPTIONS: { days: number; label: string }[] = [
  { days: 7, label: "7 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
];

export function RangeTabs({ days, basePath = "/admin/analytics" }: { days: number; basePath?: string }) {
  return (
    <div className="inline-flex rounded-lg border bg-card p-0.5">
      {OPTIONS.map((o) => (
        <Link
          key={o.days}
          href={`${basePath}?days=${o.days}`}
          scroll={false}
          className={cn(
            "rounded-md px-3 py-1 text-xs font-medium tracking-tight transition",
            days === o.days
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}
