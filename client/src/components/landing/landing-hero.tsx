import { getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { HeroCta } from "./hero-cta";
import { HeroPreview } from "./hero-preview";

export async function LandingHero() {
  const t = await getTranslations("landing.hero");
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-6 pt-20 pb-16 text-center md:pt-28 md:pb-24">
      <Badge
        variant="outline"
        className="gap-1.5 bg-white/70 tracking-tight text-[#525252] shadow-[0_1px_0_rgba(15,17,19,0.04)] backdrop-blur"
      >
        <span className="relative flex size-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#00B67A]/70" />
          <span className="relative size-1.5 rounded-full bg-[#00B67A]" />
        </span>
        {t("badge")}
      </Badge>
      <h1 className="max-w-4xl text-[46px] font-semibold leading-[0.98] tracking-[-0.04em] text-[#0F1113] md:text-[80px]">
        {t("title1")}
        <br className="hidden md:block" />
        <span className="bg-gradient-to-br from-[#0F1113] to-[#525252] bg-clip-text text-transparent">
          {t("title2")}
        </span>
      </h1>
      <p className="max-w-xl text-[17px] leading-[1.55] tracking-tight text-[#525252]">
        {t("body")}
      </p>
      <HeroCta />
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] tracking-tight text-[#737373]">
        <span>{t("stat1")}</span>
        <span className="size-1 rounded-full bg-[#D4D4D4]" />
        <span>{t("stat2")}</span>
        <span className="size-1 rounded-full bg-[#D4D4D4]" />
        <span>{t("stat3")}</span>
      </div>
      <HeroPreview />
    </section>
  );
}
