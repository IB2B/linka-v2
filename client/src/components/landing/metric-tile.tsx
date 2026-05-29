import { Card } from "@/components/ui/card";
import type { Metric } from "./metrics-data";

export function MetricTile({ metric }: { metric: Metric }) {
  return (
    <Card className="gap-2 rounded-none border-0 bg-transparent px-6 py-7 text-left ring-0">
      <p className="text-[36px] font-semibold leading-[1] tracking-[-0.035em] text-white md:text-[44px]">
        {metric.value}
      </p>
      <p className="text-[13px] font-medium tracking-tight text-white/85">
        {metric.label}
      </p>
      <p className="text-[12px] leading-[1.55] tracking-tight text-white/55">
        {metric.hint}
      </p>
    </Card>
  );
}
