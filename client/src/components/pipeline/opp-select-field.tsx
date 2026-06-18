"use client";

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type Option = { value: string; label: string };

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  ariaLabel: string;
  placeholder?: string;
};

export function OppSelectField({ value, onChange, options, ariaLabel, placeholder }: Props) {
  return (
    <Select value={value} onValueChange={(v) => onChange(String(v ?? ""))}>
      <SelectTrigger aria-label={ariaLabel} className="h-8 w-full">
        <SelectValue placeholder={placeholder}>
          {(v: string) => options.find((o) => o.value === v)?.label ?? placeholder ?? ""}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
