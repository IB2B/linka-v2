import type { LegalSection as Section } from "./legal.types";

export function LegalSection({ index, section }: { index: number; section: Section }) {
  return (
    <section id={section.id} className="flex scroll-mt-24 flex-col gap-3">
      <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[#0F1113]">
        <span className="text-[#A3A3A3]">{index}.</span> {section.heading}
      </h2>
      {section.blocks.map((block, i) =>
        block.type === "list" ? (
          <ul key={i} className="flex flex-col gap-2">
            {block.items.map((item, j) => (
              <li
                key={j}
                className="flex gap-2.5 text-[15px] leading-[1.65] tracking-tight text-[#525252]"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#6D5FF9]/60" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p
            key={i}
            className="text-[15px] leading-[1.7] tracking-tight text-[#525252]"
          >
            {block.text}
          </p>
        ),
      )}
    </section>
  );
}
