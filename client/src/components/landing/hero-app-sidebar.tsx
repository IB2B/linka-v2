import {
  BarChart3, Calendar, Inbox, KanbanSquare, LayoutDashboard, Mic, Radar,
  Search, Sparkles, type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { BrandLogo } from "@/components/brand-logo";

// Icons and order match the real workspace nav in lib/dashboard/navigation.ts.
const ICONS: LucideIcon[] = [
  LayoutDashboard, Inbox, KanbanSquare, Sparkles, Radar, Mic, Calendar, BarChart3,
];

export async function HeroAppSidebar() {
  const t = await getTranslations("nav");
  const labels = [
    t("Overview"), t("Conversations"), t("Pipeline"), t("Generate"),
    t("Trend Radar"), t("Voice Lab"), t("Calendar"), t("Analytics"),
  ];
  return (
    <div className="hidden w-[168px] shrink-0 flex-col gap-4 border-r border-[#F1F1F3] bg-[#FCFCFD] px-3 py-3.5 sm:flex">
      <div className="flex items-center gap-2 px-1">
        <BrandLogo size={20} />
        <span className="text-[13px] font-semibold tracking-tight text-[#0F1113]">
          linka
        </span>
      </div>
      <div className="flex items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 ring-1 ring-[#EDEDF0]">
        <Search className="size-3 text-[#A3A3A3]" />
        <span aria-hidden className="h-1 w-11 rounded-full bg-[#EDEDF0]" />
      </div>
      <ul className="flex flex-col gap-0.5">
        {labels.map((label, i) => {
          const Icon = ICONS[i];
          return (
            <li
              key={label}
              data-active={i === 0}
              className="flex items-center gap-2 rounded-lg px-2 py-[7px] text-[11.5px] tracking-tight text-[#737373] data-[active=true]:bg-white data-[active=true]:font-medium data-[active=true]:text-[#0F1113] data-[active=true]:shadow-[0_1px_2px_rgba(15,17,19,0.06)] data-[active=true]:ring-1 data-[active=true]:ring-[#EDEDF0]"
            >
              <Icon className="size-3.5 shrink-0" strokeWidth={1.75} />
              <span className="truncate">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
