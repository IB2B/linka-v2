"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Props = { value: string; display: string };

export function CopyId({ value, display }: Props) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <span className="inline-flex items-center gap-1">
      <span>{display}</span>
      <button
        onClick={handleCopy}
        className="opacity-40 hover:opacity-100 transition-opacity"
        aria-label="Copy ID"
        type="button"
      >
        {copied
          ? <Check className="size-3 text-green-500" />
          : <Copy className="size-3" />}
      </button>
    </span>
  );
}
