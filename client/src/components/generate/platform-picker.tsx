"use client";

import { Button } from "@/components/ui/button";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PLATFORMS, type Platform } from "@/lib/content/platforms";

type Props = {
  value: Platform;
  onChange: (p: Platform) => void;
  disabled?: boolean;
};

export function PlatformPicker({ value, onChange, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {PLATFORMS.map(({ value: v, label }) => (
        <Button
          key={v}
          type="button"
          size="sm"
          variant={value === v ? "default" : "outline"}
          disabled={disabled}
          onClick={() => onChange(v)}
          className="gap-1.5"
        >
          <PlatformIcon platform={v} className="size-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
