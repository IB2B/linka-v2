import { getTranslations } from "next-intl/server";

import { Card } from "@/components/ui/card";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PLATFORMS } from "@/lib/zernio/platforms";

export async function PlatformsStrip() {
  const t = await getTranslations("landing.platforms");
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-2 pb-20">
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
        {t("eyebrow")}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {PLATFORMS.map((p) => (
          <Card
            key={p.slug}
            size="sm"
            className="items-center justify-center bg-white py-4 text-[#0F1113] ring-[#E5E5E5] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(15,17,19,0.12)]"
          >
            <span
              aria-hidden
              className="flex size-10 items-center justify-center rounded-xl text-white"
              style={{ background: p.gradient ?? p.color }}
            >
              <PlatformIcon platform={p.slug} className="size-5" />
            </span>
            <span className="text-[12px] font-medium tracking-tight text-[#0F1113]">
              {p.label}
            </span>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-center text-[12.5px] tracking-tight text-[#737373]">
        {t("note")}
      </p>
    </section>
  );
}
