import { LineChart, BellOff, Bookmark } from "lucide-react";

export function HeroPreviewHeader() {
  return (
    <div className="flex items-center justify-between border-b border-[#F4F4F5] px-5 py-3">
      <div className="flex items-center gap-2 text-[12.5px] tracking-tight text-[#0F1113]">
        <LineChart className="size-3.5 text-[#737373]" />
        <span className="font-medium">Audience analytics</span>
        <span className="text-[#A3A3A3]">·</span>
        <span className="text-[#737373]">last 30 days</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="flex size-7 items-center justify-center rounded-md border border-[#E5E5E5] text-[#737373]">
          <BellOff className="size-3.5" />
        </span>
        <span className="flex size-7 items-center justify-center rounded-md border border-[#E5E5E5] text-[#737373]">
          <Bookmark className="size-3.5" />
        </span>
        <span className="rounded-md border border-[#E5E5E5] px-2.5 py-1 text-[11.5px] tracking-tight text-[#525252]">
          Export
        </span>
      </div>
    </div>
  );
}
