import type { Intent } from "@/lib/inbox/assist.types";

const STYLES: Record<Intent, { label: string; className: string }> = {
  purchase: { label: "Buying signal", className: "bg-emerald-500/15 text-emerald-600 border-emerald-500/40" },
  support:  { label: "Support",       className: "bg-amber-500/15 text-amber-600 border-amber-500/40" },
  faq:      { label: "FAQ",           className: "bg-sky-500/15 text-sky-600 border-sky-500/40" },
  spam:     { label: "Spam",          className: "bg-rose-500/15 text-rose-600 border-rose-500/40" },
  other:    { label: "Reply needed",  className: "bg-violet-500/15 text-violet-600 border-violet-500/40" },
};

export function IntentBadge({ intent, confidence }: { intent: Intent; confidence: number }) {
  const s = STYLES[intent];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${s.className}`}
    >
      {s.label}
      <span className="opacity-60">{Math.round(confidence * 100)}%</span>
    </span>
  );
}
