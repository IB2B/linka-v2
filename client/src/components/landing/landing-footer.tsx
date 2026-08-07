import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { BrandLogo } from "@/components/brand-logo";
import { FooterBar } from "./footer-bar";
import { FooterColumn } from "./footer-column";
import { FooterContact } from "./footer-contact";

export async function LandingFooter() {
  const [t, nav] = await Promise.all([
    getTranslations("landing.footer"),
    getTranslations("landing.nav"),
  ]);
  const product = [
    { label: nav("features"), href: "#features" },
    { label: nav("tour"), href: "#tour" },
    { label: nav("process"), href: "#process" },
    { label: nav("pricing"), href: "#pricing" },
    { label: nav("faq"), href: "#faq" },
  ];
  const account = [
    { label: nav("signIn"), href: "/login" },
    { label: nav("getStarted"), href: "/register" },
  ];
  return (
    <footer className="relative z-10 border-t border-[#EBEBEB] bg-[#FAFAFB]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex w-fit items-center gap-2.5">
            <BrandLogo size={28} />
            <span className="text-[17px] font-semibold tracking-[-0.02em] text-[#0F1113]">
              linka
            </span>
          </Link>
          <p className="max-w-xs text-[13px] leading-[1.6] tracking-tight text-[#737373]">
            {t("tagline")}
          </p>
        </div>
        <FooterColumn title={t("product")} links={product} />
        <FooterColumn title={t("account")} links={account} />
        <FooterContact intro={t("contactIntro")} />
      </div>
      <FooterBar
        copyright={t("copyright", { year: new Date().getFullYear() })}
        developedBy={t("developedBy")}
      />
    </footer>
  );
}
