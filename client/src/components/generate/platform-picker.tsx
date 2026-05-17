"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PLATFORMS, type Platform } from "@/lib/content/platforms";

type Props = {
  values: Platform[];
  onChange: (next: Platform[]) => void;
  disabled?: boolean;
};

export function PlatformPicker({ values, onChange, disabled }: Props) {
  function toggle(p: Platform) {
    if (values.includes(p)) {
      if (values.length === 1) return;
      onChange(values.filter((v) => v !== p));
    } else {
      onChange([...values, p]);
    }
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {PLATFORMS.map(({ value: v, label }) => {
        const active = values.includes(v);
        return (
          <Button
            key={v}
            type="button"
            size="sm"
            variant={active ? "default" : "outline"}
            disabled={disabled}
            onClick={() => toggle(v)}
            className="gap-1.5"
            aria-pressed={active}
          >
            <PlatformIcon platform={v} className="size-4" />
            {label}
            {active ? <Check className="size-3" /> : null}
          </Button>
        );
      })}
    </div>
  );
}
