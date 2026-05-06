type Slice = { label: string; value: number; color: string };

const R = 36;
const C = 2 * Math.PI * R;

export function StatusDonut({ slices }: { slices: Slice[] }) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  let offset = 0;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="size-28 -rotate-90">
        <circle cx="50" cy="50" r={R} fill="none"
          className="stroke-muted" strokeWidth="12" />
        {slices.map((s) => {
          const len = (s.value / total) * C;
          const dash = `${len} ${C - len}`;
          const el = (
            <circle key={s.label} cx="50" cy="50" r={R} fill="none"
              stroke={s.color} strokeWidth="12"
              strokeDasharray={dash} strokeDashoffset={-offset} />
          );
          offset += len;
          return el;
        })}
      </svg>
      <ul className="flex flex-col gap-1.5 text-sm">
        {slices.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className="size-2.5 rounded-sm"
              style={{ backgroundColor: s.color }} />
            <span className="text-muted-foreground">{s.label}</span>
            <span className="font-medium tabular-nums">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
