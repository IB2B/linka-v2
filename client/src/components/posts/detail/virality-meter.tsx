import { cn } from "@/lib/utils";
import { scoreTone } from "@/lib/posts/score-tone";

export function ViralityMeter({ score }: { score: number }) {
  const t = scoreTone(score);
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <div className="relative size-16">
        <svg viewBox="0 0 64 64" className="size-16 -rotate-90">
          <circle cx="32" cy="32" r={radius} className="fill-none stroke-muted" strokeWidth="6" />
          <circle
            cx="32" cy="32" r={radius}
            className={cn("fill-none transition-[stroke-dashoffset] duration-500", t.ring)}
            strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
          {score}
        </div>
      </div>
      <div>
        <p className={cn("text-sm font-medium", t.text)}>{t.label}</p>
        <p className="text-xs text-muted-foreground">Virality score</p>
      </div>
    </div>
  );
}
