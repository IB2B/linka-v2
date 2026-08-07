import { getTranslations } from "next-intl/server";

import { PlatformPill } from "./platform-pill";
import { PLATFORMS } from "@/lib/zernio/platforms";

export async function PlatformsStrip() {
  const t = await getTranslations("landing.platforms");
  return (
    <section className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-20 pt-2">
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
        {t("eyebrow")}
      </p>
      {/* A flowing row of pills, not ten boxes on a grid — the point is the
          breadth of the list, and a grid makes it look like ten features. */}
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        {PLATFORMS.map((p) => (
          <PlatformPill key={p.slug} platform={p} />
        ))}
      </div>
      <p className="mt-7 text-center text-[12.5px] tracking-tight text-[#737373]">
        {t("note")}
      </p>
    </section>
  );
}
