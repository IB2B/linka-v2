"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { RANGE_OPTIONS, parseRange, type RangeKey } from "@/lib/analytics/range";

export function DateRangeSelector() {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, start] = useTransition();
  const value = parseRange(params.get("range") ?? undefined);

  function onChange(next: RangeKey) {
    const sp = new URLSearchParams(params);
    if (next === "30") sp.delete("range");
    else sp.set("range", next);
    const qs = sp.toString();
    start(() => router.replace(qs ? `?${qs}` : "?", { scroll: false }));
  }

  return (
    <Select value={value} onValueChange={(v) => onChange(v as RangeKey)}>
      <SelectTrigger
        className="min-w-40"
        data-pending={pending ? "" : undefined}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {RANGE_OPTIONS.map((r) => (
          <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
