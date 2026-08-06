import { getTranslations } from "next-intl/server";

import { HeroPreviewLegend } from "./hero-preview-legend";
import { HeroPreviewPlot } from "./hero-preview-plot";

export async function HeroPreviewChart() {
  const t = await getTranslations("landing.heroPreview");
  const yAxis = t.raw("yAxis") as string[];
  const xAxis = t.raw("xAxis") as string[];
  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-y-2 pb-4">
        <p className="text-[14px] font-medium tracking-tight text-[#0F1113]">
          {t("chartTitle")}
        </p>
        <div className="flex items-center gap-3">
          <HeroPreviewLegend now={t("legendNow")} prev={t("legendPrev")} />
          <span className="rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[11.5px] font-medium tracking-tight text-[#3B82F6]">
            {t("vsPrev")}
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        {/* The plot is h-52 (208px); this column is that plus one 12px line, and
            shifted up half a line, so each label centres on its gridline. */}
        <div className="-mt-1.5 flex h-55 w-8 shrink-0 flex-col justify-between self-start text-right text-[11px] leading-none tracking-tight text-[#A3A3A3]">
          {yAxis.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <HeroPreviewPlot />
          <div className="mt-3 flex justify-between text-[11px] tracking-tight text-[#A3A3A3]">
            {xAxis.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
