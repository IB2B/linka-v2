import { SectionHeading } from "./section-heading";
import { COMPARISON } from "./comparison-data";

export function ComparisonSection() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Compared"
        title="Linka vs. how you're doing it now."
      />
      <div className="mt-12 overflow-hidden rounded-xl border border-[#E5E5E5]">
        <div className="grid grid-cols-4 gap-2 bg-[#FAFAFA] px-6 py-3.5 text-[12px] font-medium tracking-tight text-[#737373]">
          <span />
          <span className="text-[#6D5FF9]">Linka</span>
          <span>Agency</span>
          <span>DIY</span>
        </div>
        {COMPARISON.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-4 gap-2 border-t border-[#E5E5E5] bg-white px-6 py-4 text-[14px] tracking-tight"
          >
            <span className="font-medium text-[#0F1113]">{r.label}</span>
            <span className="text-[#0F1113]" dangerouslySetInnerHTML={{ __html: r.linka }} />
            <span className="text-[#737373]" dangerouslySetInnerHTML={{ __html: r.agency }} />
            <span className="text-[#737373]" dangerouslySetInnerHTML={{ __html: r.diy }} />
          </div>
        ))}
      </div>
    </section>
  );
}
