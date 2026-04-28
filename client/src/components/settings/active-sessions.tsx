import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function ActiveSessions() {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-green-500/10 text-green-600 dark:text-green-400">
        <CheckCircle2 className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">This device</p>
        <p className="text-xs text-muted-foreground">Active now</p>
      </div>
      <Badge variant="secondary" className="border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400">
        Current
      </Badge>
    </div>
  );
}
