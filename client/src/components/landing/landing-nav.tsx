import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { LandingLanguageSwitch } from "./landing-language-switch";

export async function LandingNav() {
  const t = await getTranslations("landing.nav");
  const links = [
    { href: "#features", label: t("features") },
    { href: "#process", label: t("process") },
    { href: "#pricing", label: t("pricing") },
    { href: "#faq", label: t("faq") },
  ];
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6">
      <Link href="/" className="flex items-center gap-2">
        <BrandLogo size={16} className="text-[#0F1113]" />
        <span className="text-sm font-semibold tracking-tight text-[#0F1113]">
          linka<span className="text-[#A3A3A3]">.studio</span>
        </span>
      </Link>
      <nav className="hidden items-center gap-7 md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-[13px] tracking-tight text-[#525252] transition hover:text-[#0F1113]"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-1.5">
        <LandingLanguageSwitch />
        <Button
          render={<Link href="/login" />}
          nativeButton={false}
          variant="ghost"
          size="sm"
          className="hidden tracking-tight sm:inline-flex"
        >
          {t("signIn")}
        </Button>
        <Button
          render={<Link href="/register" />}
          nativeButton={false}
          size="sm"
          className="tracking-tight"
        >
          {t("getStarted")}
        </Button>
      </div>
    </header>
  );
}
