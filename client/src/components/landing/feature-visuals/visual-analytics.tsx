import { TrendingUp } from "lucide-react";

import { MockSurface } from "./mock-surface";

// Heights as a percentage of the plot area — a real series, not a ramp.
const BARS = [38, 52, 44, 71, 63, 88, 76, 94];

export function VisualAnalytics() {
  return (
    <MockSurface>
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[15px] font-semibold leading-none tabular-nums tracking-tight text-[#0F1113]">
            12.4k
          </span>
          <span className="inline-flex items-center gap-0.5 text-[9.5px] font-medium leading-none text-[#00A06C]">
            <TrendingUp className="size-2.5" />
            +34%
          </span>
        </div>
        <div className="flex flex-1 items-end gap-1">
          {BARS.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-[2px] ${i === BARS.length - 1 ? "bg-[#6D5FF9]" : "bg-[#6D5FF9]/20"}`}
            />
          ))}
        </div>
      </div>
    </MockSurface>
  );
}
