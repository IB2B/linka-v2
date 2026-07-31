"use client";

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  LOGO_PLACEMENTS, type LogoPlacement,
} from "@/lib/content/platform-instructions.types";

const FALLBACK: LogoPlacement = "bottom_right";

// Uncontrolled on purpose — the surrounding brand kit is a plain form post, so
// the name is all that matters and there is no state to keep in sync.
export function LogoPlacementSelect(
  { defaultValue }: { defaultValue?: LogoPlacement },
) {
  return (
    <Select name="bkLogoPlacement" defaultValue={defaultValue ?? FALLBACK}>
      <SelectTrigger aria-label="Logo placement" className="w-40">
        <SelectValue>
          {(v: string) =>
            LOGO_PLACEMENTS.find((p) => p.value === v)?.label ?? v}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {LOGO_PLACEMENTS.map((p) => (
          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
