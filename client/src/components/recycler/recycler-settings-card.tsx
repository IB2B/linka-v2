"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { updateRecycleSettingsAction } from "@/app/dashboard/recycler/actions";
import type { RecycleSettings } from "@/types/recycler";

const SELECT =
  "h-9 w-full rounded-md border bg-background px-2 text-sm shadow-sm";

export function RecyclerSettingsCard({
  settings,
}: { settings: RecycleSettings }) {
  const [enabled, setEnabled] = useState(settings.enabled);
  const [perWeek, setPerWeek] = useState(settings.perWeek);
  const [minAgeDays, setMinAgeDays] = useState(settings.minAgeDays);
  const [pending, start] = useTransition();

  function save(next: Partial<Omit<RecycleSettings, "lastRunAt">>) {
    const merged = { enabled, perWeek, minAgeDays, ...next };
    setEnabled(merged.enabled);
    setPerWeek(merged.perWeek);
    setMinAgeDays(merged.minAgeDays);
    start(async () => {
      const res = await updateRecycleSettingsAction(merged);
      if (res.error) toast.error(res.error);
      else toast.success("Saved.");
    });
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-3 space-y-0 pb-3">
        <CardTitle className="text-sm font-medium">Recycler settings</CardTitle>
        {pending ? <Spinner /> : null}
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Suggestions</Label>
          <label className="flex h-9 cursor-pointer items-center gap-2 rounded-md border bg-background px-3 text-sm shadow-sm">
            <Checkbox
              checked={enabled}
              onCheckedChange={(c) => save({ enabled: !!c })}
              disabled={pending}
            />
            {enabled ? "Enabled" : "Disabled"}
          </label>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Per week</Label>
          <select
            value={perWeek}
            onChange={(e) => save({ perWeek: Number(e.target.value) })}
            disabled={pending}
            className={SELECT}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n} post{n > 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Min age</Label>
          <select
            value={minAgeDays}
            onChange={(e) => save({ minAgeDays: Number(e.target.value) })}
            disabled={pending}
            className={SELECT}
          >
            {[14, 30, 60, 90, 180].map((n) => (
              <option key={n} value={n}>{n} days</option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
