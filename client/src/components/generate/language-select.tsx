"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/lib/content/languages";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function LanguageSelect({ value, onChange, disabled }: Props) {
  return (
    <Select
      name="language"
      value={value}
      onValueChange={(v) => onChange(String(v))}
      disabled={disabled}
    >
      <SelectTrigger id="language" className="w-full">
        <SelectValue>
          {(v: string) => LANGUAGES.find((l) => l.value === v)?.label ?? v}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((l) => (
          <SelectItem key={l.value} value={l.value}>
            {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
