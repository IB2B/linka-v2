"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MONTHS, type MonthOption } from "@/components/admin/overview/month-options";
import type { AdminStats } from "@/types/admin";

const fmt = new Intl.NumberFormat("en-US");

export function OverviewSubscriptions({ stats }: { stats: AdminStats }) {
  const [selected, setSelected] = useState<MonthOption>(MONTHS[0]);
  const [data, setData] = useState({ paying: stats.subscriptions.paying, free: stats.subscriptions.free });

  useEffect(() => {
    fetch(`/api/admin/stats/subscriptions?month=${selected.value}`, { credentials: "include" })
      .then((r) => r.ok ? r.json() : null)
      .then((j) => { if (j) setData({ paying: j.paying, free: j.free }); });
  }, [selected.value]);

  const total = Math.max(data.paying + data.free, 1);
  const payingPct = Math.round((data.paying / total) * 100);

  return (
    <Card size="sm" className="gap-3 px-5 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">Subscriptions</h3>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="h-6 gap-1 px-2 text-xs" />}>
              {selected.label} <ChevronDown className="size-3 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
              {MONTHS.map((m) => (
                <DropdownMenuItem key={m.value} onClick={() => setSelected(m)} className="text-xs">
                  {m.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/admin/subscriptions"
            className="inline-flex items-center gap-1 text-xs font-medium tracking-tight text-muted-foreground hover:text-foreground">
            View all <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
      <div>
        <div className="flex items-baseline justify-between">
          <span className="font-heading text-3xl font-semibold tabular-nums tracking-tight">
            {fmt.format(data.paying)}
          </span>
          <span className="text-xs tabular-nums tracking-tight text-muted-foreground">
            {payingPct}% paying
          </span>
        </div>
        <p className="text-xs tracking-tight text-muted-foreground">new paying subscribers</p>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-muted">
        <span className="bg-emerald-500" style={{ width: `${payingPct}%` }} />
        <span className="bg-muted-foreground/40" style={{ width: `${100 - payingPct}%` }} />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs tracking-tight">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500" />
          Paying <span className="tabular-nums text-muted-foreground">{fmt.format(data.paying)}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          Free <span className="tabular-nums text-muted-foreground">{fmt.format(data.free)}</span>
        </span>
      </div>
    </Card>
  );
}
