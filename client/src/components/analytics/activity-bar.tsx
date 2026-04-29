type ActivityBarProps = {
  date: string;
  count: number;
  max: number;
};

export function ActivityBar({ date, count, max }: ActivityBarProps) {
  const height = max === 0 ? 4 : Math.max(4, Math.round((count / max) * 100));
  const day = new Date(date).getUTCDate();
  return (
    <div className="flex flex-1 flex-col items-center gap-1.5">
      <div className="flex h-24 w-full items-end">
        <div
          className="w-full rounded-sm bg-primary/80 transition-all"
          style={{ height: `${height}%` }}
          title={`${date}: ${count}`}
        />
      </div>
      <span className="text-[10px] text-muted-foreground tabular-nums">
        {day}
      </span>
    </div>
  );
}
