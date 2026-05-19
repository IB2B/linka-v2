import { CheckCircle2 } from "lucide-react";

export function NotificationsEmpty() {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="size-5" />
      </div>
      <p className="text-sm font-medium text-foreground">You&rsquo;re all caught up</p>
      <p className="text-xs text-muted-foreground">No new notifications right now.</p>
    </div>
  );
}
