import { getTranslations } from "next-intl/server";

import { HeroPreviewLegend } from "./hero-preview-legend";
import { HeroPreviewPlot } from "./hero-preview-plot";

export async function HeroPreviewChart() {
  const t = await getTranslations("landing.heroPreview");
  const yAxis = t.raw("yAxis") as string[];
  const xAxis = t.raw("xAxis") as string[];
  return (
    <div className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-y-2 pb-4">
        <p className="text-[12.5px] font-medium tracking-tight text-[#0F1113]">
          {t("chartTitle")}
        </p>
        <div className="flex items-center gap-3">
          <HeroPreviewLegend now={t("legendNow")} prev={t("legendPrev")} />
          <span className="rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[10.5px] font-medium tracking-tight text-[#3B82F6]">
            {t("vsPrev")}
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        {/* h-40 matches the plot, +10px and a -5px offset so each label centres
            on its gridline rather than hanging below it. */}
        <div className="-mt-1.25 flex h-42.5 w-6 shrink-0 flex-col justify-between self-start text-right text-[9.5px] leading-none tracking-tight text-[#A3A3A3]">
          {yAxis.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <HeroPreviewPlot />
          <div className="mt-2.5 flex justify-between text-[9.5px] tracking-tight text-[#A3A3A3]">
            {xAxis.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
