import { cn } from "@/lib/utils";
import { TONE_TEXT, type UsageTone } from "@/lib/usage/usage-tone";

type Props = { pct: number; tone: UsageTone; stroke?: number; className?: string };

// Progress ring for the fullest quota; the track is a faint copy of the tone.
export function UsageRing({ pct, tone, stroke = 2.5, className }: Props) {
  const r = 9 - stroke / 2;
  const c = 2 * Math.PI * r;
  const filled = pct > 0 ? Math.max(0.04, pct / 100) : 0;
  return (
    <svg viewBox="0 0 18 18" className={cn("-rotate-90", TONE_TEXT[tone], className)} aria-hidden>
      <circle cx="9" cy="9" r={r} fill="none" strokeWidth={stroke} stroke="currentColor"
        className="opacity-25" />
      <circle cx="9" cy="9" r={r} fill="none" strokeWidth={stroke} stroke="currentColor"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - filled)}
        className="transition-[stroke-dashoffset] duration-500" />
    </svg>
  );
}
