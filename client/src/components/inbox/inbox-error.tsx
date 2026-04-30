import { AlertCircle } from "lucide-react";

export function InboxError({ message, hint }: { message: string; hint?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted">
        <AlertCircle aria-hidden className="size-5 text-muted-foreground" />
      </span>
      <p className="text-sm font-medium">{message}</p>
      {hint ? <p className="max-w-sm text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
