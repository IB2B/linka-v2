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
  className?: string;
};

export function LanguageSelect({ value, onChange, disabled, className }: Props) {
  return (
    <Select
      name="language"
      value={value ?? LANGUAGES[0].value}
      onValueChange={(v) => onChange(String(v))}
      disabled={disabled}
    >
      <SelectTrigger id="language" className={className ?? "w-full"}>
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
