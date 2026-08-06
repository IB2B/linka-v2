import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { BrandLogo } from "@/components/brand-logo";
import { LandingNavActions } from "./landing-nav-actions";

export async function LandingNav() {
  const t = await getTranslations("landing.nav");
  const links = [
    { href: "#features", label: t("features") },
    { href: "#tour", label: t("tour") },
    { href: "#process", label: t("process") },
    { href: "#pricing", label: t("pricing") },
    { href: "#faq", label: t("faq") },
  ];
  return (
    <header className="relative z-20">
      <div className="mx-auto grid h-[76px] w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandLogo size={32} />
          <span className="text-[19px] font-semibold tracking-[-0.02em] text-[#0F1113]">
            linka
          </span>
        </Link>
        <nav className="hidden items-center gap-8 justify-self-center md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] tracking-tight text-[#525252] transition hover:text-[#0F1113]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <LandingNavActions />
      </div>
    </header>
  );
}
