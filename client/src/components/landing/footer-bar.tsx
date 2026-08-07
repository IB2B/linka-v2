import Link from "next/link";

import { LEGAL_LINKS } from "./footer-data";

type Props = { copyright: string; developedBy: string };

export function FooterBar({ copyright, developedBy }: Props) {
  return (
    <div className="border-t border-[#EBEBEB]">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[12px] tracking-tight text-[#737373]">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>{copyright}</span>
          {LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-[#0F1113]">
              {l.label}
            </Link>
          ))}
        </div>
        <span>
          {developedBy}{" "}
          <a
            href="https://intelligentb2b.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#0F1113] transition hover:text-[#6D5FF9]"
          >
            intelligentb2b
          </a>
        </span>
      </div>
    </div>
  );
}
