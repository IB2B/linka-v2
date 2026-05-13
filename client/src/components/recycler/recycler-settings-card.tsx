"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { RecyclerSelectField } from "./recycler-select-field";
import { updateRecycleSettingsAction } from "@/app/dashboard/recycler/actions";
import type { RecycleSettings } from "@/types/recycler";

const PER_WEEK_OPTS = [1, 2, 3, 4, 5].map((n) => ({ value: n, label: `${n} post${n > 1 ? "s" : ""}` }));
const AGE_OPTS = [14, 30, 60, 90, 180].map((n) => ({ value: n, label: `${n} days` }));

export function RecyclerSettingsCard({ settings }: { settings: RecycleSettings }) {
  const [enabled, setEnabled] = useState(settings.enabled);
  const [perWeek, setPerWeek] = useState(settings.perWeek);
  const [minAgeDays, setMinAgeDays] = useState(settings.minAgeDays);
  const [pending, start] = useTransition();

  function save(next: Partial<Omit<RecycleSettings, "lastRunAt">>) {
    const merged = { enabled, perWeek, minAgeDays, ...next };
    setEnabled(merged.enabled); setPerWeek(merged.perWeek); setMinAgeDays(merged.minAgeDays);
    start(async () => {
      const res = await updateRecycleSettingsAction(merged);
      if (res.error) toast.error(res.error); else toast.success("Saved.");
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
            <Checkbox checked={enabled} onCheckedChange={(c) => save({ enabled: !!c })} disabled={pending} />
            {enabled ? "Enabled" : "Disabled"}
          </label>
        </div>
        <RecyclerSelectField label="Per week" value={perWeek} options={PER_WEEK_OPTS} disabled={pending} onChange={(v) => save({ perWeek: v })} />
        <RecyclerSelectField label="Min age" value={minAgeDays} options={AGE_OPTS} disabled={pending} onChange={(v) => save({ minAgeDays: v })} />
      </CardContent>
    </Card>
  );
}
