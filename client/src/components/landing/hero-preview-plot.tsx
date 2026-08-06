import { GRID, H, LAST, NOW_AREA, NOW_LINE, PREV_LINE, W } from "./hero-preview-series";

// Strokes carry vectorEffect="non-scaling-stroke" because the viewBox is
// stretched to the container width — without it the line thins out and the
// dashes on the comparison series stretch with it.
export function HeroPreviewPlot() {
  return (
    <div className="hp-rise relative h-52">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="hp-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {GRID.map((f) => {
          const y = Math.min(H - 0.5, Math.max(0.5, f * H));
          return (
            <line
              key={f}
              x1="0"
              x2={W}
              y1={y}
              y2={y}
              stroke="#F1F1F3"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        <path d={NOW_AREA} fill="url(#hp-area)" />
        <path
          d={PREV_LINE}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="hp-line"
          d={NOW_LINE}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: LAST.left, top: LAST.top }}
      >
        <span className="absolute inset-0 size-3 animate-ping rounded-full bg-[#3B82F6]/50" />
        <span className="relative block size-3 rounded-full border-2 border-white bg-[#3B82F6] shadow-[0_0_0_4px_rgba(59,130,246,0.12)]" />
      </span>
    </div>
  );
}
