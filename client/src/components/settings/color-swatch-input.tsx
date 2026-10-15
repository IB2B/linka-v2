"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { normalizeHex } from "@/lib/content/normalize-hex";

type Props = { name: string; label: string; defaultValue?: string };

// Typed values are tidied to "#RRGGBB" when the field loses focus, so what you
// see is what saves. Anything that still isn't a colour is flagged, not dropped.
export function ColorSwatchInput({ name, label, defaultValue }: Props) {
  const [hex, setHex] = useState(defaultValue ? normalizeHex(defaultValue) || defaultValue : "");
  const normalized = normalizeHex(hex);
  const invalid = hex.trim() !== "" && !normalized;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-xs">{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={`${label} colour picker`}
          value={normalized ? normalized.toLowerCase() : "#000000"}
          onChange={(e) => setHex(e.target.value.toUpperCase())}
          className="size-9 shrink-0 cursor-pointer rounded-md border border-input bg-transparent p-1"
        />
        <Input
          id={name}
          name={name}
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          onBlur={() => { if (normalized) setHex(normalized); }}
          placeholder="#1A1A1A"
          maxLength={9}
          aria-invalid={invalid || undefined}
          className="font-mono uppercase"
        />
      </div>
      {invalid ? <p className="text-xs text-destructive">Use a hex code like #1A1A1A.</p> : null}
    </div>
  );
}
