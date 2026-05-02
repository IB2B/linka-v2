"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PLATFORMS } from "@/lib/zernio/platforms";
import type { Platform } from "@/lib/zernio/zernio-account.types";

type Props = {
  platform: Platform;
  label: string;
  selected: boolean;
  connected: boolean;
  onToggle: () => void;
};

export function PlatformChip({ platform, label, selected, connected, onToggle }: Props) {
  const meta = PLATFORMS.find((p) => p.slug === platform);
  const color = meta?.color ?? "#64748b";
  const bg = meta?.gradient ?? color;

  if (!connected) {
    return (
      <Link
        href="/dashboard/accounts"
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted"
        title={`Connect ${label} to post`}
      >
        <PlatformIcon platform={platform} className="size-3.5" style={{ color }} />
        {label}
        <span className="ml-1 text-[10px] uppercase tracking-wide">Connect</span>
      </Link>
    );
  }

  const style = selected
    ? { background: bg, borderColor: color, color: "#fff" }
    : { borderColor: `${color}66`, color, backgroundColor: `${color}14` };

  return (
    <button
      type="button"
      onClick={onToggle}
      style={style}
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition hover:brightness-110"
    >
      {selected ? (
        <Check className="size-3.5" />
      ) : (
        <PlatformIcon platform={platform} className="size-3.5" />
      )}
      {label}
    </button>
  );
}
