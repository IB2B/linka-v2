import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function LandingFooter() {
  const t = await getTranslations("landing.footer");
  const cols = [
    { title: t("product"), links: ["Features", "Pricing", "Changelog", "Roadmap"] },
    { title: t("company"), links: ["About", "Blog", "Careers", "Press"] },
    { title: t("legal"), links: ["Terms", "Privacy", "Security", "DPA"] },
  ];
  return (
    <footer className="relative z-10 border-t border-[#E5E5E5]">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-3">
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
        {cols.map((c) => (
          <div key={c.title} className="flex flex-col gap-3">
            <h4 className="text-[12px] font-medium tracking-tight text-[#0F1113]">
              {c.title}
            </h4>
            {c.links.map((l) => (
              <a
                key={l}
                href="#"
                className="text-[13px] tracking-tight text-[#737373] transition hover:text-[#0F1113]"
              >
                {l}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-[#E5E5E5]">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[12px] tracking-tight text-[#737373]">
          <span>{t("copyright", { year: new Date().getFullYear() })}</span>
          <span>{t("designed")}</span>
        </div>
      </div>
    </footer>
  );
}
