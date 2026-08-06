import { Eye, Activity, UserPlus, TrendingUp } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { HeroStatSpark } from "./hero-stat-spark";

const items = [
  { key: "impressions", value: "184K", delta: "+28%", accent: "#3B82F6", Icon: Eye,
    series: [3.4, 4.2, 4.0, 5.3, 6.4, 7.4, 8.8, 9.6] },
  { key: "engagementRate", value: "12.4%", delta: "+3.2 pts", accent: "#6D5FF9", Icon: Activity,
    series: [9.2, 9.6, 9.4, 10.3, 10.1, 11.4, 11.9, 12.4] },
  { key: "newFollowers", value: "+1,240", delta: "+18%", accent: "#16A34A", Icon: UserPlus,
    series: [28, 31, 36, 34, 42, 45, 51, 58] },
] as const;

export async function HeroPreviewStats() {
  const t = await getTranslations("landing.heroPreview");
  return (
    <div className="grid gap-4 border-b border-[#F0F0F3] p-6 sm:grid-cols-3">
      {items.map(({ key, value, delta, accent, Icon, series }) => (
        <div
          key={key}
          className="group flex flex-col gap-3 rounded-xl border border-[#EAEAEE] bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#D9D9DE] hover:shadow-[0_16px_34px_-22px_rgba(15,17,19,0.3)]"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[12.5px] tracking-tight text-[#737373]">{t(key)}</p>
            <span
              className="flex size-6 shrink-0 items-center justify-center rounded-md transition group-hover:scale-110"
              style={{ backgroundColor: `${accent}14`, color: accent }}
            >
              <Icon className="size-3.5" strokeWidth={2} />
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[26px] font-semibold leading-none tracking-[-0.03em] text-[#0F1113]">
              {value}
            </p>
            <span className="inline-flex items-center gap-1 text-[12px] font-medium tracking-tight text-[#16A34A]">
              <TrendingUp className="size-3.5" />
              {delta}
            </span>
          </div>
          <HeroStatSpark data={series} color={accent} />
        </div>
      ))}
    </div>
  );
}
