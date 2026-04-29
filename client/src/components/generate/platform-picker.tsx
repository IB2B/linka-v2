"use client";

import { Button } from "@/components/ui/button";
import { PLATFORMS, type Platform } from "@/lib/content/platforms";
import { cn } from "@/lib/utils";

type Props = {
  value: Platform;
  onChange: (p: Platform) => void;
  disabled?: boolean;
};

export function PlatformPicker({ value, onChange, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {PLATFORMS.map(({ value: v, label, icon: Icon }) => (
        <Button
          key={v}
          type="button"
          size="sm"
          variant={value === v ? "default" : "outline"}
          disabled={disabled}
          onClick={() => onChange(v)}
          className={cn("gap-1.5")}
        >
          <Icon className="size-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
