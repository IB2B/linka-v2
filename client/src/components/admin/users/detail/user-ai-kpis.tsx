import { Card } from "@/components/ui/card";
import {
  calcTokenCost, formatTokenCost as fmtCost, formatTokenCount as fmtK,
} from "@/lib/admin/token-cost";
import type { UserAiStats } from "@/types/admin-user-ai.types";

const fmt = new Intl.NumberFormat("en-US");
const calcCost = calcTokenCost;

type Cell = { label: string; value: string; sub?: string };

function KpiCell({ label, value, sub }: Cell) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="font-display text-2xl font-semibold tabular-nums tracking-tight">{value}</span>
      {sub && <span className="text-[11px] tracking-tight text-muted-foreground">{sub}</span>}
    </div>
  );
}

export function UserAiKpis({ stats }: { stats: UserAiStats }) {
  const totalTok = stats.tokensInput + stats.tokensOutput;
  const cost = calcCost(stats.tokensInput, stats.tokensOutput);
  const last30Cost = calcCost(stats.last30TokensInput, stats.last30TokensOutput);
  const last30Tok = stats.last30TokensInput + stats.last30TokensOutput;
  const pubRate = stats.total === 0 ? 0 : Math.round((stats.published / stats.total) * 1000) / 10;

  const cells: Cell[] = [
    { label: "Total drafts", value: fmt.format(stats.total), sub: `${fmt.format(stats.last30)} in last 30d` },
    { label: "Publish rate", value: `${pubRate}%`, sub: `${fmt.format(stats.published)} posted` },
    { label: "Total tokens", value: fmtK(totalTok),
      sub: `${fmtK(stats.tokensInput)} in · ${fmtK(stats.tokensOutput)} out` },
    { label: "Est. all-time cost", value: fmtCost(cost), sub: "Haiku 4.5 pricing" },
    { label: "Avg tokens / draft", value: fmt.format(stats.avgTokens), sub: "input + output" },
    { label: "Last 30d tokens", value: fmtK(last30Tok),
      sub: last30Tok > 0 ? fmtCost(last30Cost) + " est." : "No data" },
  ];

  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="grid grid-cols-2 divide-y divide-x sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
        {cells.map((c) => <KpiCell key={c.label} {...c} />)}
      </div>
    </Card>
  );
}
