import { Calendar, Clock, AtSign } from "lucide-react";
import type { Opportunity } from "@/types/pipeline";

function fmt(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export function OppMeta({ opp }: { opp: Opportunity }) {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-xl border bg-card px-4 py-3 text-xs">
      <div className="flex items-center gap-2">
        <Calendar className="size-3.5 text-muted-foreground" />
        <div className="min-w-0">
          <p className="text-muted-foreground">Added</p>
          <p className="truncate font-medium">{fmt(opp.createdAt)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="size-3.5 text-muted-foreground" />
        <div className="min-w-0">
          <p className="text-muted-foreground">Last activity</p>
          <p className="truncate font-medium">{fmt(opp.lastActivityAt)}</p>
        </div>
      </div>
      {opp.contactHandle ? (
        <div className="col-span-2 flex items-center gap-2 border-t pt-2">
          <AtSign className="size-3.5 text-muted-foreground" />
          <p className="truncate font-medium">{opp.contactHandle}</p>
        </div>
      ) : null}
    </div>
  );
}
