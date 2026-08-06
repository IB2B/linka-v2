import { getTranslations } from "next-intl/server";

import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PLATFORM_BRAND_COLORS } from "@/lib/platforms/brand-colors";
import type { Platform } from "@/lib/zernio/zernio-account.types";

// Shares of the 184K impressions above, so the row adds up to the same window.
const SPLIT: { slug: Platform; label: string; share: string }[] = [
  { slug: "linkedin", label: "LinkedIn", share: "46%" },
  { slug: "twitter", label: "X", share: "28%" },
  { slug: "instagram", label: "Instagram", share: "26%" },
];

export async function HeroPreviewPlatforms() {
  const t = await getTranslations("landing.heroPreview");
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[#F0F0F3] px-6 py-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#A3A3A3]">
        {t("topPlatforms")}
      </p>
      <div className="flex items-center gap-4">
        {SPLIT.map((p) => (
          <span key={p.slug} className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="flex size-5 items-center justify-center rounded text-white"
              style={{ background: PLATFORM_BRAND_COLORS[p.slug] }}
            >
              <PlatformIcon platform={p.slug} className="size-3" />
            </span>
            <span className="text-[12.5px] tracking-tight text-[#525252]">{p.label}</span>
            <span className="text-[12.5px] font-medium tracking-tight text-[#0F1113]">
              {p.share}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
