"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = { name: string; label: string; defaultValue?: string };

const HEX = /^#[0-9a-fA-F]{6}$/;

export function ColorSwatchInput({ name, label, defaultValue }: Props) {
  const [hex, setHex] = useState(defaultValue ?? "");
  const valid = HEX.test(hex);

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-xs">{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={`${label} colour picker`}
          value={valid ? hex : "#000000"}
          onChange={(e) => setHex(e.target.value)}
          className="size-9 shrink-0 cursor-pointer rounded-md border border-input bg-transparent p-1"
        />
        <Input
          id={name}
          name={name}
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          placeholder="#1A1A1A"
          maxLength={7}
          className="font-mono uppercase"
        />
      </div>
    </div>
  );
}
