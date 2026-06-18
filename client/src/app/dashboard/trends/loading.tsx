function CardSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border bg-card/40 p-4">
      <div className="h-3 w-16 rounded-full bg-muted" />
      <div className="h-4 w-3/4 rounded bg-muted" />
      <div className="space-y-1.5">
        <div className="h-2.5 w-full rounded bg-muted" />
        <div className="h-2.5 w-5/6 rounded bg-muted" />
      </div>
      <div className="h-14 rounded-lg bg-muted/60" />
      <div className="h-14 rounded-lg bg-muted/60" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
}
