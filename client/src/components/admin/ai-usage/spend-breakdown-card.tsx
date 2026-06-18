import { Card } from "@/components/ui/card";
import { FileText, Image as ImageIcon, Wallet } from "lucide-react";
import type { AiUsageOverview } from "@/types/admin-ai-usage";
import { SpendRow, type SpendSegment } from "./spend-row";
import { fmtNum, fmtTok, fmtCost, textCost, imageCost } from "./spend-rates";

function textSegments(tokIn: number, tokOut: number): SpendSegment[] {
  const total = tokIn + tokOut;
  if (total === 0) return [{ width: 100, color: "bg-muted" }];
  const inPct = Math.round((tokIn / total) * 100);
  return [
    { width: inPct, color: "bg-violet-300", label: `${fmtTok(tokIn)} input` },
    { width: 100 - inPct, color: "bg-violet-600", label: `${fmtTok(tokOut)} output` },
  ];
}

function imageSegments(done: number, failed: number): SpendSegment[] {
  const total = done + failed;
  if (total === 0) return [{ width: 100, color: "bg-muted" }];
  const okPct = Math.round((done / total) * 100);
  if (failed === 0) return [{ width: 100, color: "bg-rose-500" }];
  return [
    { width: okPct, color: "bg-rose-500", label: `${done} completed` },
    { width: 100 - okPct, color: "bg-rose-200", label: `${failed} failed` },
  ];
}

export function SpendBreakdownCard({ kpis }: { kpis: AiUsageOverview["kpis"] }) {
  const tokIn = kpis.tokensInput.curr;
  const tokOut = kpis.tokensOutput.curr;
  const images = kpis.imagesCompleted.curr;
  const tCost = textCost(tokIn, tokOut);
  const iCost = imageCost(images);
  const total = tCost + iCost;

  return (
    <Card size="sm" className="gap-0 p-0 transition hover:ring-foreground/20">
      <div className="flex items-center gap-2 border-b px-5 py-3">
        <Wallet className="size-3.5 text-muted-foreground" />
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Spend split
        </h3>
      </div>
      <div className="space-y-5 px-5 py-4">
        <SpendRow
          icon={<FileText className="size-3.5 text-violet-500" />}
          label="Text generation"
          count={`${fmtNum.format(kpis.drafts.curr)} drafts · ${fmtTok(tokIn + tokOut)} tokens`}
          cost={fmtCost(tCost)}
          segments={textSegments(tokIn, tokOut)}
        />
        <SpendRow
          icon={<ImageIcon className="size-3.5 text-rose-500" />}
          label="Image generation"
          count={`${fmtNum.format(images)} images`}
          cost={fmtCost(iCost)}
          segments={imageSegments(images, kpis.imagesFailed.curr)}
        />
      </div>
      <div className="flex items-baseline justify-between border-t bg-muted/40 px-5 py-3 text-xs tracking-tight">
        <span className="font-medium uppercase tracking-wider text-muted-foreground">
          Total estimated
        </span>
        <span className="font-display text-base font-semibold tabular-nums">
          {fmtCost(total)}
        </span>
      </div>
    </Card>
  );
}
