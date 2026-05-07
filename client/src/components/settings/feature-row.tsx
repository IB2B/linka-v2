"use client";

import type { LucideIcon } from "lucide-react";

import { FeatureToggle } from "./feature-toggle";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  pending?: boolean;
};

export function FeatureRow({
  icon: Icon, title, description, checked, onChange, pending,
}: Props) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border bg-card p-4">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-foreground/80">
          <Icon className="size-4" />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <FeatureToggle
        ariaLabel={title}
        checked={checked}
        onChange={onChange}
        disabled={pending}
      />
    </div>
  );
}
