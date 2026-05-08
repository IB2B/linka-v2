import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { Card } from "@/components/ui/card";
import { computeDelta, DELTA_TONE } from "@/lib/admin/delta";
import type { ActivityWindow } from "@/types/admin";

const fmt = new Intl.NumberFormat("en-US");

const ARROW = { up: ArrowUpRight, down: ArrowDownRight, flat: Minus } as const;

type Props = {
  label: string;
  window: ActivityWindow;
  polarity?: "up-good" | "up-bad";
};

export function KpiTile({ label, window, polarity = "up-good" }: Props) {
  const delta = computeDelta(window, polarity);
  const Arrow = ARROW[delta.direction];
  return (
    <Card size="sm" className="gap-2 px-5 py-4">
      <span className="text-xs font-medium tracking-tight text-muted-foreground">
        {label}
      </span>
      <div className="flex items-end justify-between gap-3">
        <span className="text-3xl font-semibold tabular-nums tracking-tight">
          {fmt.format(window.curr)}
        </span>
        <span
          className={`flex items-center gap-0.5 text-xs font-medium tabular-nums tracking-tight ${DELTA_TONE[delta.tone]}`}
        >
          <Arrow className="size-3" />
          {delta.text}
        </span>
      </div>
      <span className="text-[11px] tracking-tight text-muted-foreground">
        vs. previous 24h ({fmt.format(window.prev)})
      </span>
    </Card>
  );
}
