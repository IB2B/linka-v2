import { Play } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Content = {
  scriptLabel: string;
  script: string;
  aspect: string;
  seconds: string;
  status: string;
};

// Bar heights for the fake waveform — non-textual demo data.
const BARS = [5, 9, 14, 8, 17, 11, 6, 13, 9, 16, 7, 11, 5, 12, 8];

export function TourMockAvatar({ c }: { c: Content }) {
  return (
    <div className="grid gap-3 sm:grid-cols-[84px_1fr]">
      <div className="relative flex h-[150px] items-end justify-center overflow-hidden rounded-lg bg-[#0F1113] p-2">
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90"
        >
          <Play className="size-3 fill-[#0F1113] text-[#0F1113]" />
        </span>
        <span className="absolute left-2 top-2 rounded bg-white/12 px-1.5 py-0.5 text-[9px] font-medium tracking-tight text-white/85">
          {c.aspect}
        </span>
        <div aria-hidden className="flex w-full items-end justify-center gap-[3px]">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-white/35"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
      <Card size="sm" className="gap-2.5 bg-white px-3 py-3 text-[#0F1113] ring-[#E5E5E5]">
        <p className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#A3A3A3]">
          {c.scriptLabel}
        </p>
        <p className="text-[11.5px] leading-snug tracking-tight text-[#0F1113]">{c.script}</p>
        <div className="mt-auto flex items-center gap-1.5 border-t border-[#F4F4F5] pt-2">
          <Badge variant="outline" className="border-[#E5E5E5] text-[10px] tracking-tight text-[#525252]">
            {c.seconds}
          </Badge>
          <span className="flex items-center gap-1.5 text-[10px] tracking-tight text-[#16A34A]">
            <span className="size-1.5 rounded-full bg-[#16A34A]" />
            {c.status}
          </span>
        </div>
      </Card>
    </div>
  );
}
