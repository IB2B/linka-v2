"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SampleRow } from "./sample-row";
import { SamplesToolbar } from "./samples-toolbar";
import type { WritingSample } from "@/types/voice-lab";

export function SamplesList({ samples }: { samples: WritingSample[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(samples.map((s) => s.id)) : new Set());
  }

  const allChecked = samples.length > 0 && selected.size === samples.length;
  const selectedIds = [...selected];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>Your samples</CardTitle>
            <CardDescription>
              {samples.length === 0 ? "No samples yet." : `${samples.length} samples`}
            </CardDescription>
          </div>
          {samples.length > 0 ? (
            <Label className="flex items-center gap-2 text-xs text-muted-foreground">
              <Checkbox checked={allChecked} onCheckedChange={toggleAll} />
              Select all
            </Label>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {selected.size > 0 ? (
          <SamplesToolbar
            selectedIds={selectedIds}
            onClear={() => setSelected(new Set())}
          />
        ) : null}
        {samples.map((s) => (
          <SampleRow
            key={s.id}
            sample={s}
            selected={selected.has(s.id)}
            onToggle={() => toggle(s.id)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
