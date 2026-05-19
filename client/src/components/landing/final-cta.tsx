import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export async function FinalCta() {
  const t = await getTranslations("landing.finalCta");
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white px-8 py-16 md:px-14 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(109,95,249,0.14)_0%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,17,19,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,17,19,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(60%_60%_at_50%_40%,#000_10%,transparent_85%)]"
        />
        <div className="relative flex flex-col items-center gap-6 text-center">
          <Badge variant="outline" className="gap-1.5 bg-white/70 tracking-tight text-[#525252] backdrop-blur">
            <span className="size-1.5 rounded-full bg-[#00B67A]" />
            {t("badge")}
          </Badge>
          <h2 className="max-w-3xl text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#0F1113] md:text-[60px]">
            {t("title")}
          </h2>
          <p className="max-w-xl text-[15px] leading-[1.6] tracking-tight text-[#525252]">
            {t("body")}
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <Button
              render={<Link href="/register" />}
              nativeButton={false}
              size="lg"
              className="tracking-tight"
            >
              {t("ctaPrimary")} <ArrowUpRight />
            </Button>
            <Button
              render={<Link href="/login" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="tracking-tight"
            >
              {t("ctaSecondary")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
