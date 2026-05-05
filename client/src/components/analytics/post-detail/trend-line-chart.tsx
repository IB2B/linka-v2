import type { PostMetrics, PostSnapshot } from "@/types/analytics";

type Series = { key: keyof PostMetrics; label: string; color: string };

const W = 600;
const H = 200;
const PAD = 4;

function pointAt(
  idx: number, n: number, value: number, max: number,
): [number, number] {
  const x = n === 1 ? W / 2 : (idx * W) / (n - 1);
  const y = max === 0 ? H - PAD : H - PAD - (value / max) * (H - PAD * 2);
  return [x, y];
}

function buildPath(values: number[], max: number): string {
  return values.map((v, i) => {
    const [x, y] = pointAt(i, values.length, v, max);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function buildArea(values: number[], max: number): string {
  if (values.length < 2) return "";
  return `${buildPath(values, max)} L${W},${H} L0,${H} Z`;
}

export function TrendLineChart({
  snapshots, series,
}: { snapshots: PostSnapshot[]; series: Series[] }) {
  const max = Math.max(
    1,
    ...series.flatMap((s) => snapshots.map((sn) => sn.metrics[s.key])),
  );
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
      className="h-56 w-full">
      <line x1="0" y1={H - PAD} x2={W} y2={H - PAD}
        className="stroke-muted" strokeWidth="1" />
      {series.map((s) => {
        const values = snapshots.map((sn) => sn.metrics[s.key]);
        return (
          <g key={s.key}>
            <path d={buildArea(values, max)} fill={s.color} fillOpacity="0.08" />
            <path d={buildPath(values, max)} fill="none"
              stroke={s.color} strokeWidth="2"
              strokeLinejoin="round" strokeLinecap="round" />
            {values.map((v, i) => {
              const [x, y] = pointAt(i, values.length, v, max);
              return <circle key={i} cx={x} cy={y} r="2.5" fill={s.color} />;
            })}
          </g>
        );
      })}
    </svg>
  );
}
