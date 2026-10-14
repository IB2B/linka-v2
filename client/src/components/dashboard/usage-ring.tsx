import { cn } from "@/lib/utils";
import { TONE_TEXT, type UsageTone } from "@/lib/usage/usage-tone";

const R = 7;
const C = 2 * Math.PI * R;

// Tiny progress ring for the header usage button.
export function UsageRing({ pct, tone }: { pct: number; tone: UsageTone }) {
  const filled = pct > 0 ? Math.max(0.04, pct / 100) : 0;
  return (
    <svg viewBox="0 0 18 18" className={cn("size-4 -rotate-90", TONE_TEXT[tone])} aria-hidden>
      <circle cx="9" cy="9" r={R} fill="none" strokeWidth="2.5" stroke="currentColor" className="opacity-25" />
      <circle cx="9" cy="9" r={R} fill="none" strokeWidth="2.5" stroke="currentColor"
        strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - filled)}
        className="transition-[stroke-dashoffset] duration-500" />
    </svg>
  );
}
