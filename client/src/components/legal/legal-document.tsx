import type { LegalContent } from "./legal.types";
import { LegalSection } from "./legal-section";
import { LegalToc } from "./legal-toc";

export function LegalDocument({ title, lastUpdated, intro, sections }: LegalContent) {
  return (
    <main className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
      <header className="flex flex-col gap-4 border-b border-[#E5E5E5] pb-10">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6D5FF9]">
          Legal
        </span>
        <h1 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#0F1113] md:text-[44px]">
          {title}
        </h1>
        <p className="text-[13px] tracking-tight text-[#A3A3A3]">
          Last updated {lastUpdated}
        </p>
        <p className="max-w-2xl text-[16px] leading-[1.7] tracking-tight text-[#525252]">
          {intro}
        </p>
      </header>
      <div className="mt-12 grid gap-12 lg:grid-cols-[210px_1fr]">
        <LegalToc sections={sections} />
        <div className="flex flex-col gap-11">
          {sections.map((s, i) => (
            <LegalSection key={s.id} index={i + 1} section={s} />
          ))}
        </div>
      </div>
    </main>
  );
}
