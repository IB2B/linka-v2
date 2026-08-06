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
    <div className="hidden w-[212px] shrink-0 flex-col gap-5 border-r border-[#F0F0F3] bg-[#FBFBFC] p-4 sm:flex">
      <div className="flex items-center gap-2 px-1">
        <BrandLogo size={26} />
        <span className="text-[15px] font-semibold tracking-tight text-[#0F1113]">
          linka<span className="text-[#A3A3A3]">.studio</span>
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 ring-1 ring-[#ECECEF]">
        <Search className="size-3.5 shrink-0 text-[#A3A3A3]" />
        <span aria-hidden className="h-1.5 w-16 rounded-full bg-[#EDEDF0]" />
      </div>
      <ul className="flex flex-col gap-1">
        {labels.map((label, i) => {
          const Icon = ICONS[i];
          return (
            <li
              key={label}
              data-active={i === 0}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] tracking-tight text-[#6B6B72] data-[active=true]:bg-white data-[active=true]:font-medium data-[active=true]:text-[#0F1113] data-[active=true]:shadow-[0_1px_2px_rgba(15,17,19,0.06)] data-[active=true]:ring-1 data-[active=true]:ring-[#ECECEF]"
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.75} />
              <span className="truncate">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
