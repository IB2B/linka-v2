import { TrendingUp } from "lucide-react";

const items = [
  { label: "Impressions", value: "184K", delta: "+28%" },
  { label: "Engagement rate", value: "12.4%", delta: "+3.2 pts" },
  { label: "New followers", value: "+1,240", delta: "+18%" },
];

export function HeroPreviewStats() {
  return (
    <div className="grid grid-cols-3 gap-3 border-b border-[#F4F4F5] p-5">
      {items.map((s) => (
        <div
          key={s.label}
          className="flex flex-col gap-1.5 rounded-xl border border-[#E5E5E5] bg-white p-3"
        >
          <p className="text-[11px] tracking-tight text-[#737373]">{s.label}</p>
          <p className="text-[20px] font-semibold tracking-[-0.02em] text-[#0F1113]">
            {s.value}
          </p>
          <p className="inline-flex items-center gap-1 text-[11px] font-medium tracking-tight text-[#16A34A]">
            <TrendingUp className="size-3" />
            {s.delta}
          </p>
        </div>
      ))}
    </div>
  );
}
