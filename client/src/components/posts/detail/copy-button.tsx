"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

type Props = { value: string; label?: string };

export function CopyButton({ value, label = "Copy" }: Props) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard.");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy.");
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={label}
      className="shrink-0 text-muted-foreground/60 transition-colors hover:text-foreground"
    >
      {copied
        ? <Check className="size-3.5 text-green-500" />
        : <Copy className="size-3.5" />}
    </button>
  );
}
