import { getTranslations } from "next-intl/server";

import { HeroBadge } from "./hero-badge";
import { HeroCta } from "./hero-cta";
import { HeroArcs } from "./hero-arcs";
import { HeroFloatTiles } from "./hero-float-tiles";
import { HeroAppPeek } from "./hero-app-peek";

export async function LandingHero() {
  const t = await getTranslations("landing.hero");
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24">
      <HeroArcs />
      <HeroFloatTiles />
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <HeroBadge />
        <h1 className="text-[42px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#0F1113] md:text-[64px]">
          {t("title1")}
          <br />
          {t("title2")}
        </h1>
        <p className="max-w-xl text-[15.5px] leading-[1.65] tracking-tight text-[#525252]">
          {t("body")}
        </p>
        <HeroCta />
      </div>
      <div className="relative z-10 mt-16 md:mt-20">
        <HeroAppPeek />
      </div>
    </section>
  );
}
