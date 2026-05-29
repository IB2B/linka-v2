import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { LandingLanguageSwitch } from "./landing-language-switch";

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
    <header className="relative z-20 border-b border-[#0F1113]/[0.06] bg-white/70 backdrop-blur">
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo size={28} />
          <span className="text-[15px] font-semibold tracking-tight text-[#0F1113]">
            linka<span className="text-[#A3A3A3]">.studio</span>
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
        <div className="flex items-center gap-3 justify-self-end">
          <LandingLanguageSwitch />
          <Link
            href="/login"
            className="hidden text-[14px] tracking-tight text-[#0F1113] transition hover:text-[#525252] sm:inline"
          >
            {t("signIn")}
          </Link>
          <Button render={<Link href="/register" />} nativeButton={false}>
            {t("getStarted")}
          </Button>
        </div>
      </div>
    </header>
  );
}
