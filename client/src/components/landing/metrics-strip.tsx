import { getTranslations } from "next-intl/server";

import { Card } from "@/components/ui/card";
import { MetricTile } from "./metric-tile";
import { METRICS } from "./metrics-data";

export async function MetricsStrip() {
  const t = await getTranslations("landing.metrics");
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20">
      <Card className="gap-0 overflow-hidden border-0 bg-[#0F1113] p-0 ring-1 ring-white/[0.06]">
        <div className="relative px-8 py-12 md:px-14 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(109,95,249,0.28)_0%,transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(70%_60%_at_50%_50%,#000_10%,transparent_85%)]"
          />
          <div className="relative flex flex-col items-center gap-3 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
              {t("eyebrow")}
            </span>
            <h2 className="max-w-2xl text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-[44px]">
              {t("title")}
            </h2>
          </div>
          <div className="relative mt-12 grid gap-px overflow-hidden rounded-xl bg-white/[0.06] ring-1 ring-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((m) => (
              <MetricTile key={m.label} metric={m} />
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
