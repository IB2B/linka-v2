import { Card } from "@/components/ui/card";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PLATFORM_BRAND_COLORS } from "@/lib/platforms/brand-colors";
import type { Platform } from "@/lib/zernio/zernio-account.types";

type Variant = { label: string; text: string; tags: string };
type Content = { ideaLabel: string; idea: string; variants: Variant[] };

// Slugs are non-textual demo data — order matches the variants in messages.
const SLUGS: Platform[] = ["linkedin", "twitter", "instagram", "reddit"];

export function TourMockFanout({ c }: { c: Content }) {
  return (
    <div className="flex flex-col gap-2.5">
      <Card size="sm" className="gap-1 bg-[#FAFAFA] px-3 py-2.5 text-[#0F1113] ring-[#E5E5E5]">
        <p className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#A3A3A3]">
          {c.ideaLabel}
        </p>
        <p className="text-[11.5px] leading-snug tracking-tight text-[#0F1113]">{c.idea}</p>
      </Card>
      <ul className="grid gap-2 sm:grid-cols-2">
        {c.variants.map((v, i) => (
          <li
            key={v.label}
            className="flex flex-col gap-1.5 rounded-lg border border-[#E5E5E5] bg-white px-3 py-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="flex size-4 items-center justify-center rounded text-white"
                  style={{ background: PLATFORM_BRAND_COLORS[SLUGS[i]] }}
                >
                  <PlatformIcon platform={SLUGS[i]} className="size-2.5" />
                </span>
                <span className="text-[10.5px] font-medium tracking-tight text-[#0F1113]">
                  {v.label}
                </span>
              </span>
              <span className="text-[10px] tracking-tight text-[#737373]">{v.tags}</span>
            </div>
            <p className="text-[11px] leading-snug tracking-tight text-[#525252]">{v.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
