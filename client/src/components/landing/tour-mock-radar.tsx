import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const trends = [
  { topic: "Agentic workflows",        delta: "+412%", series: [4, 6, 5, 8, 12, 18, 24] },
  { topic: "Founder-led marketing",    delta: "+186%", series: [10, 11, 9, 14, 16, 19, 22] },
  { topic: "Build-in-public threads",  delta: "+74%",  series: [12, 13, 14, 15, 16, 18, 20] },
];

function Spark({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 70},${24 - (v / max) * 20}`)
    .join(" ");
  return (
    <svg viewBox="0 0 70 24" className="h-5 w-16" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke="#6D5FF9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TourMockRadar() {
  return (
    <Card size="sm" className="gap-3 bg-white p-3.5 text-[#0F1113] ring-[#E5E5E5]">
      <p className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#A3A3A3]">
        Trending in your niche
      </p>
      <ul className="flex flex-col gap-2.5">
        {trends.map((t) => (
          <li
            key={t.topic}
            className="flex items-center justify-between gap-3 rounded-lg bg-[#FAFAFA] px-3 py-2"
          >
            <span className="truncate text-[11.5px] font-medium tracking-tight text-[#0F1113]">
              {t.topic}
            </span>
            <div className="flex items-center gap-2">
              <Spark data={t.series} />
              <Badge variant="outline" className="gap-0.5 border-[#16A34A]/25 bg-[#16A34A]/10 text-[10.5px] font-medium tracking-tight text-[#16A34A]">
                <ArrowUpRight className="size-2.5" strokeWidth={2.5} />
                {t.delta}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
