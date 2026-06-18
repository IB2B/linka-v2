"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
};

export function SettingToggle({ label, description, checked, onChange, disabled }: Props) {
  return (
    <Label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border bg-muted/30 p-3">
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium tracking-tight">{label}</span>
        <span className="text-xs tracking-tight text-muted-foreground">{description}</span>
      </span>
      <Checkbox
        checked={checked}
        onCheckedChange={(c) => onChange(!!c)}
        disabled={disabled}
        className="mt-0.5"
      />
    </Label>
  );
}
