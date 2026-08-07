import Link from "next/link";

import type { FooterLink } from "./footer-data";

type Props = { title: string; links: FooterLink[] };

export function FooterColumn({ title, links }: Props) {
  return (
    <nav className="flex flex-col gap-3">
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#A3A3A3]">
        {title}
      </span>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="w-fit text-[13.5px] tracking-tight text-[#525252] transition hover:text-[#0F1113]"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
