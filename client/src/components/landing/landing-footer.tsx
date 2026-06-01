import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { LEGAL_LINKS } from "./footer-data";
import { FooterContact } from "./footer-contact";

export async function LandingFooter() {
  const t = await getTranslations("landing.footer");
  return (
    <footer className="relative z-10 border-t border-[#E5E5E5]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#6D5FF9]" />
            <span className="text-sm font-semibold tracking-tight text-[#0F1113]">
              linka<span className="text-[#A3A3A3]">.studio</span>
            </span>
          </Link>
          <p className="max-w-xs text-[13px] leading-[1.6] tracking-tight text-[#737373]">
            {t("tagline")}
          </p>
        </div>
        <FooterContact
          intro={t("contactIntro")}
          className="md:items-end md:text-right"
        />
      </div>
      <div className="border-t border-[#E5E5E5]">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[12px] tracking-tight text-[#737373]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>{t("copyright", { year: new Date().getFullYear() })}</span>
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition hover:text-[#0F1113]"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <span>
            {t("developedBy")}{" "}
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
    </footer>
  );
}
