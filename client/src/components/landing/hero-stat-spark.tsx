import { smoothPath } from "./hero-preview-series";

const W = 100;
const H = 32;

type Props = { data: readonly number[]; color: string };

// Full-width sparkline under each stat, so the three tiles share one baseline
// instead of each line floating beside its delta.
export function HeroStatSpark({ data, color }: Props) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const pts = data.map(
    (v, i) =>
      [(i / (data.length - 1)) * W, H - 2 - ((v - min) / span) * (H - 6)] as const,
  );
  const line = smoothPath(pts);
  const id = `spark-${color.slice(1)}`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-8 w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.16" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L ${W} ${H} L 0 ${H} Z`} fill={`url(#${id})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
