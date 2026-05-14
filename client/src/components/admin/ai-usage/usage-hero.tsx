import { Card } from "@/components/ui/card";
import { KpiGrid } from "@/components/admin/ai-usage/kpi-grid";
import type { KpiItem } from "@/components/admin/ai-usage/kpi-grid";
import type { AiUsageOverview } from "@/types/admin-ai-usage";

const fmt = new Intl.NumberFormat("en-US");
const fmtK = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000 ? `${(n / 1_000).toFixed(1)}K`
  : String(n);

const INPUT_COST_PER_M = 0.8;
const OUTPUT_COST_PER_M = 4.0;
const calcCost = (inp: number, out: number) =>
  (inp / 1_000_000) * INPUT_COST_PER_M + (out / 1_000_000) * OUTPUT_COST_PER_M;
const fmtCost = (n: number) =>
  n < 0.01 ? "<$0.01" : `$${n.toFixed(n < 1 ? 3 : 2)}`;

function imgFailRate(f: number, c: number) {
  const d = f + c; return d === 0 ? 0 : Math.round((f / d) * 1000) / 10;
}

export function UsageHero({ data }: { data: AiUsageOverview }) {
  const { kpis } = data;
  const fr = imgFailRate(kpis.imagesFailed.curr, kpis.imagesCompleted.curr);
  const frPrev = imgFailRate(kpis.imagesFailed.prev, kpis.imagesCompleted.prev);
  const pubRate = kpis.drafts.curr === 0
    ? 0 : Math.round((kpis.posted.curr / kpis.drafts.curr) * 1000) / 10;
  const pubRatePrev = kpis.drafts.prev === 0
    ? 0 : Math.round((kpis.posted.prev / kpis.drafts.prev) * 1000) / 10;
  const totalTok = kpis.tokensInput.curr + kpis.tokensOutput.curr;
  const totalTokPrev = kpis.tokensInput.prev + kpis.tokensOutput.prev;
  const avgTok = kpis.drafts.curr === 0 ? 0 : Math.round(totalTok / kpis.drafts.curr);
  const cost = calcCost(kpis.tokensInput.curr, kpis.tokensOutput.curr);
  const costPrev = calcCost(kpis.tokensInput.prev, kpis.tokensOutput.prev);

  const row1: KpiItem[] = [
    { label: "Drafts generated", value: fmt.format(kpis.drafts.curr), delta: kpis.drafts },
    { label: "Published", value: fmt.format(kpis.posted.curr), delta: kpis.posted },
    { label: "Images generated", value: fmt.format(kpis.imagesCompleted.curr), delta: kpis.imagesCompleted },
    { label: "Image failure rate", value: `${fr}%`,
      delta: { curr: Math.round(frPrev - fr), prev: 0 } },
  ];
  const row2: KpiItem[] = [
    { label: "Total tokens", value: fmtK(totalTok),
      delta: { curr: totalTok, prev: totalTokPrev },
      note: `${fmtK(kpis.tokensInput.curr)} in · ${fmtK(kpis.tokensOutput.curr)} out` },
    { label: "Est. API cost", value: fmtCost(cost),
      delta: { curr: Math.round(cost * 100), prev: Math.round(costPrev * 100) },
      note: "Haiku 4.5 · $0.80 / $4.00 per M" },
    { label: "Avg tokens / draft", value: fmt.format(avgTok),
      note: totalTok === 0 ? "No token data yet" : "input + output per generation" },
    { label: "Publish rate", value: `${pubRate}%`,
      delta: { curr: Math.round(pubRate * 10), prev: Math.round(pubRatePrev * 10) },
      note: "drafts that got posted" },
  ];

  return (
    <Card size="sm" className="gap-0 p-0">
      <KpiGrid items={row1} />
      <div className="border-t" />
      <KpiGrid items={row2} />
    </Card>
  );
}
