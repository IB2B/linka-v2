import { getTranslations } from "next-intl/server";

import { HeroBadge } from "./hero-badge";
import { HeroCta } from "./hero-cta";
import { HeroPreview } from "./hero-preview";
import { HeroStats } from "./hero-stats";

export async function LandingHero() {
  const t = await getTranslations("landing.hero");
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-14 pb-12 md:pt-20 md:pb-16">
      <div className="mb-8">
        <HeroBadge />
      </div>
      <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
        <h1 className="md:col-span-7 text-[44px] font-semibold leading-[1] tracking-[-0.035em] text-[#0F1113] md:text-[68px]">
          {t("title1")}
          <br />
          <span className="text-[#0F1113]/85">{t("title2")}</span>
        </h1>
        <div className="md:col-span-5 flex flex-col gap-6">
          <p className="max-w-md text-[15.5px] leading-[1.6] tracking-tight text-[#525252]">
            {t("body")}
          </p>
          <HeroCta />
        </div>
      </div>
      <div className="mt-14">
        <HeroPreview />
      </div>
      <HeroStats />
    </section>
  );
}
