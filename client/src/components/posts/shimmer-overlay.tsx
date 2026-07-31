import { cn } from "@/lib/utils";

// The sweep that tells a media placeholder it is working rather than wedged.
// Shared by the card thumbnail and the detail panel so the two cannot drift,
// and so the keyframe name lives in exactly one place.
export function ShimmerOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-gradient-to-r",
        "from-transparent via-white/15 to-transparent",
        "motion-safe:animate-[shimmer_2s_ease-in-out_infinite]",
        className,
      )}
    />
  );
}
