import { cn } from "@/lib/utils";

type Props = { connected: boolean };

export function AccountStatusBadge({ connected }: Props) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
        connected
          ? "bg-green-500/10 text-green-600"
          : "bg-muted text-muted-foreground"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          connected ? "bg-green-500" : "bg-muted-foreground/50"
        )}
      />
      {connected ? "Active" : "Not connected"}
    </span>
  );
}
