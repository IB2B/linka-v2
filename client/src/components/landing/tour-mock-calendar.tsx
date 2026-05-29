import { Card } from "@/components/ui/card";

const days = ["M", "T", "W", "T", "F", "S", "S"];
const cells: { tone: string }[][] = [
  [{ tone: "bg-[#0A66C2]" }, { tone: "bg-[#E1306C]" }, { tone: "bg-[#0F1419]" }],
  [{ tone: "bg-[#FF0033]" }],
  [{ tone: "bg-[#0A66C2]" }, { tone: "bg-[#000000]" }],
  [{ tone: "bg-[#E1306C]" }],
  [{ tone: "bg-[#0A66C2]" }, { tone: "bg-[#BD081C]" }, { tone: "bg-[#1877F2]" }],
  [{ tone: "bg-[#0F1419]" }],
  [{ tone: "bg-[#0A66C2]" }],
];

export function TourMockCalendar() {
  return (
    <Card size="sm" className="gap-3 bg-white p-4 text-[#0F1113] ring-[#E5E5E5]">
      <div className="flex items-center justify-between">
        <p className="text-[11.5px] font-medium tracking-tight text-[#0F1113]">
          Week of Jun 9
        </p>
        <p className="text-[10.5px] tracking-tight text-[#737373]">
          14 posts queued
        </p>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d, i) => (
          <div
            key={i}
            className="flex flex-col items-stretch gap-1 rounded-lg bg-[#FAFAFA] p-1.5"
          >
            <span className="text-center text-[9.5px] font-medium tracking-tight text-[#A3A3A3]">
              {d}
            </span>
            {cells[i].map((c, j) => (
              <span
                key={j}
                aria-hidden
                className={`h-2.5 rounded-sm opacity-90 ${c.tone}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-[#F4F4F5] pt-3 text-[10.5px] tracking-tight text-[#737373]">
        <span className="size-1.5 rounded-full bg-[#6D5FF9]" />
        Optimal slots per platform — picked automatically.
      </div>
    </Card>
  );
}
