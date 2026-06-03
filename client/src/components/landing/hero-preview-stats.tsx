import { Eye, Activity, UserPlus, TrendingUp } from "lucide-react";
import { getTranslations } from "next-intl/server";

const items = [
  { key: "impressions", value: "184K", delta: "+28%", accent: "#3B82F6", Icon: Eye, series: [8, 10, 9, 13, 15, 19, 24] },
  { key: "engagementRate", value: "12.4%", delta: "+3.2 pts", accent: "#6D5FF9", Icon: Activity, series: [6, 7, 7, 9, 8, 11, 13] },
  { key: "newFollowers", value: "+1,240", delta: "+18%", accent: "#16A34A", Icon: UserPlus, series: [5, 6, 8, 7, 10, 12, 14] },
] as const;

function Spark({ data, color }: { data: readonly number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 60},${18 - ((v - min) / span) * 16}`).join(" ");
  return (
    <svg viewBox="0 0 60 18" className="h-4 w-14 shrink-0 opacity-70" aria-hidden>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export async function HeroPreviewStats() {
  const t = await getTranslations("landing.heroPreview");
  return (
    <div className="grid grid-cols-3 gap-3 border-b border-[#F4F4F5] p-5">
      {items.map(({ key, value, delta, accent, Icon, series }) => (
        <div
          key={key}
          className="group flex flex-col gap-2 rounded-xl border border-[#E5E5E5] bg-white p-3 transition duration-300 hover:-translate-y-0.5 hover:border-[#D4D4D4] hover:shadow-[0_14px_30px_-20px_rgba(15,17,19,0.3)]"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] tracking-tight text-[#737373]">{t(key)}</p>
            <span
              className="flex size-5 items-center justify-center rounded-md transition group-hover:scale-110"
              style={{ backgroundColor: `${accent}14`, color: accent }}
            >
              <Icon className="size-3" strokeWidth={2} />
            </span>
          </div>
          <p className="text-[20px] font-semibold tracking-[-0.02em] text-[#0F1113]">{value}</p>
          <div className="flex items-end justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-tight text-[#16A34A]">
              <TrendingUp className="size-3" />
              {delta}
            </span>
            <Spark data={series} color={accent} />
          </div>
        </div>
      ))}
    </div>
  );
}
