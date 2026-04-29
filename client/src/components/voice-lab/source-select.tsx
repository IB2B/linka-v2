"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SAMPLE_SOURCES } from "@/lib/voice-lab/sources";

export function SourceSelect({
  defaultValue = "linkedin",
}: {
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="source">Source</Label>
      <Select name="source" defaultValue={defaultValue}>
        <SelectTrigger id="source" className="w-full">
          <SelectValue placeholder="Select a source">
            {(value: string) =>
              SAMPLE_SOURCES.find((s) => s.value === value)?.label ?? value
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {SAMPLE_SOURCES.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
