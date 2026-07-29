import { CheckCircle2 } from "lucide-react";

// State in words, not just the toggle colour: connected rows name the account,
// available rows say so plainly.
export function AccountConnectedLine({
  connected, username,
}: { connected: boolean; username: string }) {
  if (!connected) {
    return <p className="text-[11px] text-muted-foreground/70">Not connected</p>;
  }
  return (
    <p className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
      <CheckCircle2 className="size-3 shrink-0" aria-hidden />
      <span className="truncate font-medium">@{username}</span>
    </p>
  );
}
