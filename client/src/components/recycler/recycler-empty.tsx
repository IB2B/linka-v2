import { RefreshCw } from "lucide-react";

export function RecyclerEmpty({ minAgeDays }: { minAgeDays: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-muted/20 px-6 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted/60">
        <RefreshCw className="size-5 text-muted-foreground" />
      </div>
      <h3 className="text-base font-medium">No candidates yet</h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        We surface posts that have been live for at least {minAgeDays} days
        with measurable engagement. Come back once your published posts mature.
      </p>
    </div>
  );
}
