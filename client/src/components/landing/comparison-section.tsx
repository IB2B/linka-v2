import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { COMPARISON } from "./comparison-data";

export async function ComparisonSection() {
  const t = await getTranslations("landing.comparison");
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="mt-12 overflow-hidden rounded-xl border border-[#E5E5E5] bg-white">
        <div className="grid grid-cols-4 gap-2 border-b border-[#E5E5E5] bg-[#FAFAFA] px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-[#737373]">
          <span />
          <span className="text-[#6D5FF9]">Linka</span>
          <span>Agency</span>
          <span>DIY</span>
        </div>
        {COMPARISON.map((r, i) => (
          <div
            key={r.label}
            className={`grid grid-cols-4 gap-2 px-6 py-4 text-[14px] tracking-tight ${
              i % 2 === 1 ? "bg-[#FAFAFA]/60" : "bg-white"
            } ${i > 0 ? "border-t border-[#E5E5E5]" : ""}`}
          >
            <span className="font-medium text-[#0F1113]">{r.label}</span>
            <span
              className="font-medium text-[#0F1113]"
              dangerouslySetInnerHTML={{ __html: r.linka }}
            />
            <span className="text-[#737373]" dangerouslySetInnerHTML={{ __html: r.agency }} />
            <span className="text-[#737373]" dangerouslySetInnerHTML={{ __html: r.diy }} />
          </div>
        ))}
      </div>
    </section>
  );
}
