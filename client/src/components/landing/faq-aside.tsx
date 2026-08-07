import { CONTACT } from "./footer-data";

type Props = { eyebrow: string; title: string; stillStuck: string };

/** Sticky left rail for the FAQ — the heading follows you down the list, and
 *  the way out is next to the questions rather than three sections later. */
export function FaqAside({ eyebrow, title, stillStuck }: Props) {
  return (
    <div className="md:sticky md:top-24 md:self-start">
      <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6D5FF9]">
        <span className="size-1 rounded-full bg-[#6D5FF9]" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0F1113] md:text-[36px]">
        {title}
      </h2>
      <p className="mt-6 text-[13.5px] tracking-tight text-[#737373]">{stillStuck}</p>
      <a
        href={`mailto:${CONTACT.emails[1]}`}
        className="text-[13.5px] font-medium tracking-tight text-[#6D5FF9] underline-offset-4 transition hover:underline"
      >
        {CONTACT.emails[1]}
      </a>
    </div>
  );
}
