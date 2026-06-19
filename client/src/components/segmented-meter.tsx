import { cn } from "@/lib/utils";

const TONE: Record<"primary" | "warning" | "danger", string> = {
  primary: "bg-primary",
  warning: "bg-yellow-500",
  danger: "bg-destructive",
};

// Segmented tick meter for usage/quota. Fill is proportional; tone shifts to
// amber near the limit and red at/over it so it reads as "running low".
export function SegmentedMeter({ pct, segments = 36 }: { pct: number; segments?: number }) {
  const clamped = Math.max(0, Math.min(100, pct));
  const filled = Math.max(clamped > 0 ? 1 : 0, Math.round((clamped / 100) * segments));
  const tone = clamped >= 100 ? "danger" : clamped >= 80 ? "warning" : "primary";

  return (
    <div
      className="flex items-center gap-[3px]"
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {Array.from({ length: segments }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-4 flex-1 rounded-[2px] transition-colors",
            i < filled ? TONE[tone] : "bg-muted",
          )}
        />
      ))}
    </div>
  );
}
