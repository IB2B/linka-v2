"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { UsageChart } from "@/components/admin/ai-usage/usage-chart";
import {
  SERIES, seriesTotals, trimLeadingZeros, type SeriesKey,
} from "@/components/admin/ai-usage/usage-chart-series";
import type { AiUsagePoint } from "@/types/admin-ai-usage";

const fmt = new Intl.NumberFormat("en-US");

type Props = { series: AiUsagePoint[]; days: number };

export function UsageChartCard({ series, days }: Props) {
  const [active, setActive] = useState<Set<SeriesKey>>(new Set(["drafts", "posted", "failed"]));

  const toggle = (k: SeriesKey) =>
    setActive((prev) => {
      if (prev.has(k) && prev.size === 1) return prev;
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });

  const totals = seriesTotals(series);
  const trimmed = totals.drafts + totals.posted === 0 ? series : trimLeadingZeros(series);
  const label = active.size === 3 ? "All series" : [...active].map((k) => SERIES.find((s) => s.key === k)!.label).join(", ");

  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">AI generation over time</h3>
          <p className="text-xs tracking-tight text-muted-foreground">
            {trimmed.length < series.length
              ? `Showing ${trimmed.length} days with activity (of ${days} day window).`
              : `Drafts and posts over the last ${days} days.`}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
            <span className="flex items-center gap-1.5 text-xs">
              {label} <ChevronDown className="size-3 text-muted-foreground" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {SERIES.map(({ key, label: name, color }) => (
              <DropdownMenuCheckboxItem key={key} checked={active.has(key)} onClick={() => toggle(key)}>
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full shrink-0" style={{ background: color }} />
                  {name}
                  <span className="ml-auto tabular-nums text-muted-foreground text-xs">
                    {fmt.format(totals[key])}
                  </span>
                </span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-3 pb-3">
        <UsageChart data={trimmed} activeKeys={[...active]} />
      </div>
    </Card>
  );
}
