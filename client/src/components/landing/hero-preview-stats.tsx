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
    <div className="grid gap-3 border-b border-[#F4F4F5] p-5 sm:grid-cols-3">
      {items.map(({ key, value, delta, accent, Icon, series }) => (
        <div
          key={key}
          className="group flex flex-col gap-2.5 rounded-xl border border-[#E5E5E5] bg-white p-3 transition duration-300 hover:-translate-y-0.5 hover:border-[#D4D4D4] hover:shadow-[0_14px_30px_-20px_rgba(15,17,19,0.3)]"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[11px] tracking-tight text-[#737373]">{t(key)}</p>
            <span
              className="flex size-5 shrink-0 items-center justify-center rounded-md transition group-hover:scale-110"
              style={{ backgroundColor: `${accent}14`, color: accent }}
            >
              <Icon className="size-3" strokeWidth={2} />
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[20px] font-semibold tracking-[-0.02em] text-[#0F1113]">
              {value}
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-tight text-[#16A34A]">
              <TrendingUp className="size-3" />
              {delta}
            </span>
          </div>
          <HeroStatSpark data={series} color={accent} />
        </div>
      ))}
    </div>
  );
}
