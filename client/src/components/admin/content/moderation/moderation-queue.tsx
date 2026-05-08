import { ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { FlagCard } from "@/components/admin/content/moderation/flag-card";
import type { FlagRow } from "@/types/admin-moderation";

export function ModerationQueue({ flags }: { flags: FlagRow[] }) {
  if (flags.length === 0) {
    return (
      <Card size="sm" className="items-center justify-center gap-3 px-6 py-16 text-center">
        <ShieldCheck className="size-5 text-muted-foreground" />
        <p className="text-sm font-medium tracking-tight">Queue is clear</p>
        <p className="max-w-sm text-sm tracking-tight text-muted-foreground">
          No flags match this filter. Reports from users will appear here for review.
        </p>
      </Card>
    );
  }
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {flags.map((f) => <FlagCard key={f.id} flag={f} />)}
    </div>
  );
}
