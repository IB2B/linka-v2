import type { Opportunity } from "@/types/pipeline";

function fmt(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export function OppMeta({ opp }: { opp: Opportunity }) {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/40 px-4 py-3 text-xs">
      <div>
        <p className="text-muted-foreground">Added</p>
        <p className="mt-0.5 font-medium">{fmt(opp.createdAt)}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Last activity</p>
        <p className="mt-0.5 font-medium">{fmt(opp.lastActivityAt)}</p>
      </div>
      {opp.contactHandle ? (
        <div className="col-span-2">
          <p className="text-muted-foreground">Handle</p>
          <p className="mt-0.5 font-medium">{opp.contactHandle}</p>
        </div>
      ) : null}
    </div>
  );
}
