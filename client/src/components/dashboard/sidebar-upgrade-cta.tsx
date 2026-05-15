import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SidebarUpgradeCta() {
  return (
    <div className="mx-1 mb-1 flex items-center justify-between gap-2 rounded-lg border bg-card px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <Sparkles className="size-4 shrink-0 text-foreground" />
        <p className="truncate text-sm font-medium">Upgrade to Pro</p>
      </div>
      <Button
        render={<Link href="/dashboard/billing" />}
        nativeButton={false}
        size="sm"
        className="h-7 shrink-0 px-2.5 text-xs"
      >
        Upgrade
      </Button>
    </div>
  );
}
