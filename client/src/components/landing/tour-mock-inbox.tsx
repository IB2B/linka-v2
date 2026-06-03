import { Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Content = {
  name: string;
  time: string;
  question: string;
  draftBadge: string;
  reply: string;
  send: string;
  rewrite: string;
  skip: string;
};

export function TourMockInbox({ c }: { c: Content }) {
  return (
    <div className="flex flex-col gap-2.5">
      <Card size="sm" className="gap-1.5 bg-white px-3 py-3 text-[#0F1113] ring-[#E5E5E5]">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="size-6 rounded-full bg-gradient-to-br from-sky-300 to-violet-400"
          />
          <span className="text-[11.5px] font-medium tracking-tight text-[#0F1113]">
            {c.name}
          </span>
          <span className="text-[10.5px] tracking-tight text-[#A3A3A3]">· {c.time}</span>
        </div>
        <p className="pl-8 text-[11.5px] leading-snug tracking-tight text-[#525252]">
          {c.question}
        </p>
      </Card>
      <Card
        size="sm"
        className="ml-5 gap-2 bg-[#F8F7FF] px-3 py-3 text-[#0F1113] ring-[#6D5FF9]/25"
      >
        <Badge
          variant="outline"
          className="w-fit gap-1 border-[#6D5FF9]/25 bg-white text-[10px] font-medium uppercase tracking-[0.14em] text-[#6D5FF9]"
        >
          <Sparkles className="size-3" strokeWidth={2.25} />
          {c.draftBadge}
        </Badge>
        <p className="text-[11.5px] leading-snug tracking-tight text-[#0F1113]">
          {c.reply}
        </p>
        <div className="flex items-center gap-1.5">
          <Badge className="bg-[#6D5FF9] text-[10px] font-medium tracking-tight text-white">
            {c.send}
          </Badge>
          <Badge variant="outline" className="bg-white text-[10px] font-medium tracking-tight text-[#525252]">
            {c.rewrite}
          </Badge>
          <Badge variant="outline" className="bg-white text-[10px] font-medium tracking-tight text-[#525252]">
            {c.skip}
          </Badge>
        </div>
      </Card>
    </div>
  );
}
