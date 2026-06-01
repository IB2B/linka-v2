import type { LegalSection } from "./legal.types";

export function LegalToc({ sections }: { sections: LegalSection[] }) {
  return (
    <nav className="hidden lg:block">
      <div className="sticky top-24 flex flex-col gap-2.5">
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#A3A3A3]">
          On this page
        </span>
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="text-[13px] leading-snug tracking-tight text-[#737373] transition hover:text-[#6D5FF9]"
          >
            {i + 1}. {s.heading}
          </a>
        ))}
      </div>
    </nav>
  );
}
