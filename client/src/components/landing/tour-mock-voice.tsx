import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const samples = [
  "We shipped v1 in 8 weeks. Here's what we cut to get there →",
  "Founders: your changelog is your best marketing.",
  "Hot take — 'launching' is a verb, not a Tuesday.",
];

export function TourMockVoice() {
  return (
    <div className="relative grid gap-3 sm:grid-cols-[1fr_auto_1fr]">
      <Card size="sm" className="gap-2.5 bg-white px-3 py-3 text-[#0F1113] ring-[#E5E5E5]">
        <p className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#A3A3A3]">
          Your past posts
        </p>
        <ul className="flex flex-col gap-1.5">
          {samples.map((s) => (
            <li
              key={s}
              className="rounded-md bg-[#FAFAFA] px-2.5 py-1.5 text-[11.5px] leading-snug tracking-tight text-[#525252]"
            >
              {s}
            </li>
          ))}
        </ul>
      </Card>
      <div className="flex items-center justify-center self-stretch">
        <Badge variant="outline" className="border-[#6D5FF9]/20 bg-[#6D5FF9]/10 text-[10px] font-medium uppercase tracking-[0.14em] text-[#6D5FF9]">
          Trained →
        </Badge>
      </div>
      <Card
        size="sm"
        className="gap-2.5 bg-white px-3 py-3 text-[#0F1113] ring-[#6D5FF9]/30 shadow-[0_18px_40px_-22px_rgba(109,95,249,0.45)]"
      >
        <p className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#6D5FF9]">
          Linka draft
        </p>
        <p className="text-[11.5px] leading-snug tracking-tight text-[#0F1113]">
          Six months of building in public. Three lessons that saved us from
          shipping the wrong thing →
        </p>
        <div className="flex items-center gap-2 border-t border-[#F4F4F5] pt-2">
          <span className="size-1.5 rounded-full bg-[#16A34A]" />
          <span className="text-[10px] tracking-tight text-[#737373]">
            Matches your voice — 96%
          </span>
        </div>
      </Card>
    </div>
  );
}
