import { Megaphone, Wrench } from "lucide-react";
import type { PlatformNotice } from "@/lib/platform/get-platform";

export function PlatformBanner({ notice }: { notice: PlatformNotice }) {
  if (notice.maintenanceMode) {
    return (
      <div className="flex items-center gap-2 border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-700 dark:text-amber-400">
        <Wrench className="size-3.5 shrink-0" />
        {notice.maintenanceMessage
          || "Scheduled maintenance is in progress — some features may be unavailable."}
      </div>
    );
  }
  if (notice.announcementEnabled && notice.announcementMessage) {
    return (
      <div className="flex items-center gap-2 border-b bg-muted/60 px-4 py-2 text-xs font-medium text-foreground/80">
        <Megaphone className="size-3.5 shrink-0" />
        {notice.announcementMessage}
      </div>
    );
  }
  return null;
}
