import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
  isNew?: boolean;
  newLabel: string;
};

export function FeatureCard({ icon: Icon, tag, title, body, isNew, newLabel }: Props) {
  return (
    <div className="group flex flex-col gap-4 bg-white p-7 transition hover:bg-[#FAFAFA]">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[#6D5FF9]/8 ring-1 ring-[#6D5FF9]/12 transition group-hover:bg-[#6D5FF9]/14">
          <Icon className="size-4 text-[#6D5FF9]" strokeWidth={1.75} />
        </span>
        <div className="flex items-center gap-1.5">
          {isNew && (
            <Badge className="gap-1 bg-[#00B67A]/10 text-[10px] font-medium uppercase tracking-[0.14em] text-[#00B67A]">
              <span className="size-1 rounded-full bg-[#00B67A]" />
              {newLabel}
            </Badge>
          )}
          <Badge
            variant="outline"
            className="border-[#E5E5E5] bg-white text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#525252]"
          >
            {tag}
          </Badge>
        </div>
      </div>
      <h3 className="text-[15px] font-semibold tracking-tight text-[#0F1113]">
        {title}
      </h3>
      <p className="text-[14px] leading-[1.6] tracking-tight text-[#525252]">
        {body}
      </p>
    </div>
  );
}
