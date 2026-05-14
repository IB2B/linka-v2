"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SocialKey, Opportunity } from "@/types/pipeline";

type Props = {
  opp: Opportunity;
  disabled: boolean;
  onSave: (k: SocialKey, url: string | null) => void;
};

const SOCIALS: { key: SocialKey; label: string; bg: string; placeholder: string }[] = [
  { key: "socialUrl",    label: "LinkedIn",  bg: "#0A66C2", placeholder: "https://linkedin.com/in/…" },
  { key: "facebookUrl",  label: "Facebook",  bg: "#1877F2", placeholder: "https://facebook.com/…" },
  { key: "instagramUrl", label: "Instagram", bg: "#E4405F", placeholder: "https://instagram.com/…" },
  { key: "xUrl",         label: "X",         bg: "#000",    placeholder: "https://x.com/…" },
  { key: "tiktokUrl",    label: "TikTok",    bg: "#010101", placeholder: "https://tiktok.com/@…" },
  { key: "threadsUrl",   label: "Threads",   bg: "#000",    placeholder: "https://threads.net/@…" },
];

function SocialRow({ cfg, value, disabled, onSave }: {
  cfg: typeof SOCIALS[0]; value: string | null;
  disabled: boolean; onSave: (url: string | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-2">
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
        style={{ background: cfg.bg }}
      >
        {cfg.label[0]}
      </span>
      <input
        ref={ref} key={value ?? ""} type="url"
        defaultValue={value ?? ""} disabled={disabled}
        placeholder={cfg.placeholder}
        onBlur={() => { const v = ref.current?.value.trim() ?? ""; onSave(v || null); }}
        className="flex-1 rounded-md border bg-background px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50"
      />
      {value && /^https?:\/\//i.test(value) ? (
        <Button variant="ghost" size="icon-sm"
          onClick={() => window.open(value, "_blank", "noopener,noreferrer")}
          aria-label={`Open ${cfg.label}`}>
          <ExternalLink className="size-3.5" />
        </Button>
      ) : null}
    </div>
  );
}

export function OppSocialLinks({ opp, disabled, onSave }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Social profiles
      </p>
      <div className="space-y-2">
        {SOCIALS.map((cfg) => (
          <SocialRow key={cfg.key} cfg={cfg} value={opp[cfg.key]} disabled={disabled}
            onSave={(url) => onSave(cfg.key, url)} />
        ))}
      </div>
    </div>
  );
}
