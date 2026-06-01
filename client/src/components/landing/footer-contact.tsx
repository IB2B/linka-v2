import { cn } from "@/lib/utils";
import { CONTACT } from "./footer-data";

type Props = { intro: string; className?: string };

export function FooterContact({ intro, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 text-[13px] tracking-tight text-[#737373]",
        className,
      )}
    >
      <span className="font-medium text-[#0F1113]">{intro}</span>
      <a href={CONTACT.phoneHref} className="transition hover:text-[#0F1113]">
        {CONTACT.phone}
      </a>
      {CONTACT.emails.map((e) => (
        <a
          key={e}
          href={`mailto:${e}`}
          className="transition hover:text-[#0F1113]"
        >
          {e}
        </a>
      ))}
    </div>
  );
}
