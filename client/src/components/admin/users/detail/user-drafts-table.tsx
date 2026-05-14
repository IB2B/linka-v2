import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { calcTokenCost as calcCost, formatTokenCount as fmtK } from "@/lib/admin/token-cost";
import type { UserDraftRow } from "@/types/admin-user-ai.types";

const fmtCost = (n: number) => n < 0.0001 ? "<$0.001" : `$${n.toFixed(3)}`;
const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const STATUS_CLASSES: Record<string, string> = {
  posted: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  scheduled: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  draft: "bg-muted text-muted-foreground",
};

export function UserDraftsTable({ drafts }: { drafts: UserDraftRow[] }) {
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="flex items-center gap-2 border-b px-5 py-3">
        <FileText className="size-3.5 text-muted-foreground" />
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recent drafts
        </h3>
      </div>
      {drafts.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-muted-foreground">No drafts yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-2 text-left">Prompt</th>
                <th className="px-3 py-2 text-left">Platform</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-right">Tokens</th>
                <th className="px-3 py-2 text-right">Cost</th>
                <th className="px-5 py-2 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {drafts.map((d) => {
                const totalTok = (d.tokensInput ?? 0) + (d.tokensOutput ?? 0);
                const cost = d.tokensInput != null && d.tokensOutput != null
                  ? calcCost(d.tokensInput, d.tokensOutput) : null;
                return (
                  <tr key={d.id} className="hover:bg-muted/40 transition-colors">
                    <td className="max-w-[220px] truncate px-5 py-2.5 font-medium tracking-tight">
                      {d.prompt ?? <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-3 py-2.5 capitalize text-muted-foreground">{d.platform ?? "—"}</td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${STATUS_CLASSES[d.status] ?? STATUS_CLASSES.draft}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">
                      {totalTok > 0 ? fmtK(totalTok) : "—"}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-medium text-emerald-600 dark:text-emerald-400">
                      {cost != null ? fmtCost(cost) : "—"}
                    </td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-muted-foreground">
                      {fmtDate(d.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
