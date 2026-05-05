export function PlatformBar({
  label, value, max,
}: { label: string; value: number; max: number }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-40 items-end">
        <div
          className="w-10 rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 transition-all"
          style={{ height: `${Math.max(pct, 2)}%` }}
          aria-label={`${label}: ${value}`}
        />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium tabular-nums">
          {value.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground capitalize">{label}</p>
      </div>
    </div>
  );
}
