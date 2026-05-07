import { SectionHeading } from "./section-heading";
import { COMPARISON } from "./comparison-data";

export function ComparisonSection() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
      <SectionHeading
        eyebrow="04 — Compared"
        title={<>Linka vs. how you&rsquo;re doing it now.</>}
      />
      <div className="mt-14 overflow-hidden rounded-2xl ring-1 ring-[#E5E5E5]">
        <div className="grid grid-cols-4 gap-2 bg-white px-6 py-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
          <span />
          <span className="text-[#6D5FF9]">Linka</span>
          <span>Agency</span>
          <span>DIY</span>
        </div>
        {COMPARISON.map((r, i) => (
          <div
            key={r.label}
            className={`grid grid-cols-4 gap-2 border-t border-[#E5E5E5] px-6 py-5 text-[14px] ${i % 2 ? "bg-[#FAFAFA]" : "bg-white"}`}
          >
            <span className="text-[#0F1113]">{r.label}</span>
            <span className="text-[#0F1113]" dangerouslySetInnerHTML={{ __html: r.linka }} />
            <span className="text-[#737373]" dangerouslySetInnerHTML={{ __html: r.agency }} />
            <span className="text-[#737373]" dangerouslySetInnerHTML={{ __html: r.diy }} />
          </div>
        ))}
      </div>
    </section>
  );
}
