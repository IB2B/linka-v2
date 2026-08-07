import { CONTACT } from "./footer-data";

export function FooterContact({ intro }: { intro: string }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#A3A3A3]">
        {intro}
      </span>
      <a
        href={CONTACT.phoneHref}
        className="w-fit text-[13.5px] tabular-nums tracking-tight text-[#525252] transition hover:text-[#0F1113]"
      >
        {CONTACT.phone}
      </a>
      {CONTACT.emails.map((e) => (
        <a
          key={e}
          href={`mailto:${e}`}
          className="w-fit text-[13.5px] tracking-tight text-[#525252] transition hover:text-[#0F1113]"
        >
          {e}
        </a>
      ))}
    </div>
  );
}
