export function ScoreRing({ score }: { score: number }) {
  const radius = 38;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color =
    score >= 75 ? "stroke-emerald-500"
      : score >= 50 ? "stroke-amber-500"
        : "stroke-rose-500";
  return (
    <div className="relative size-24 shrink-0">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle
          cx="50" cy="50" r={radius}
          className="fill-none stroke-muted" strokeWidth="9"
        />
        <circle
          cx="50" cy="50" r={radius}
          className={`fill-none ${color} transition-all`}
          strokeWidth="9" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold tabular-nums">{score}</span>
      </div>
    </div>
  );
}
