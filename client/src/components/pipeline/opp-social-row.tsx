"use client";

import { useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { Button } from "@/components/ui/button";
import type { SocialConfig } from "./opp-social-config";

type Props = {
  cfg: SocialConfig;
  value: string | null;
  disabled: boolean;
  autoFocus?: boolean;
  onSave: (url: string | null) => void;
  onRemove: () => void;
};

export function OppSocialRow({ cfg, value, disabled, autoFocus, onSave, onRemove }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const hasUrl = !!value && /^https?:\/\//i.test(value);
  return (
    <div className="flex items-center gap-2">
      <span
        className="flex size-7 shrink-0 items-center justify-center rounded-full text-white"
        style={{ background: cfg.color }}
        title={cfg.label}
      >
        <PlatformIcon platform={cfg.iconPlatform} className="size-3.5" />
      </span>
      <input
        ref={ref} autoFocus={autoFocus} key={value ?? ""} type="url"
        defaultValue={value ?? ""} disabled={disabled}
        placeholder={cfg.placeholder}
        onBlur={() => {
          const v = ref.current?.value.trim() ?? "";
          if (v !== (value ?? "")) onSave(v || null);
        }}
        className="flex-1 rounded-md border bg-background px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50"
      />
      {hasUrl ? (
        <Button variant="ghost" size="icon-sm"
          onClick={() => window.open(value, "_blank", "noopener,noreferrer")}
          aria-label={`Open ${cfg.label}`}>
          <ExternalLink className="size-3.5" />
        </Button>
      ) : null}
      <Button variant="ghost" size="icon-sm"
        onClick={onRemove} disabled={disabled}
        aria-label={`Remove ${cfg.label}`}>
        <X className="size-3.5" />
      </Button>
    </div>
  );
}
