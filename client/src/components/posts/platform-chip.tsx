"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import type { Platform } from "@/lib/zernio/zernio-account.types";

type Props = {
  platform: Platform;
  label: string;
  selected: boolean;
  connected: boolean;
  onToggle: () => void;
};

export function PlatformChip({ platform, label, selected, connected, onToggle }: Props) {
  if (!connected) {
    return (
      <Link
        href="/dashboard/accounts"
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted"
        title={`Connect ${label} to post`}
      >
        <PlatformIcon platform={platform} className="size-3.5 opacity-60" />
        {label}
        <span className="ml-1 text-[10px] uppercase tracking-wide">Connect</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition ${
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-background hover:bg-muted"
      }`}
    >
      {selected ? <Check className="size-3.5" /> : <PlatformIcon platform={platform} className="size-3.5" />}
      {label}
    </button>
  );
}
