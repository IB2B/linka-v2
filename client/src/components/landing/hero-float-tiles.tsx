import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PLATFORM_BRAND_COLORS } from "@/lib/platforms/brand-colors";
import type { Platform } from "@/lib/zernio/zernio-account.types";

type Tile = { slug: Platform; pos: string; tilt: string; delay: string };

// Scattered along the hero arcs, mirroring the reference. Hidden below lg,
// where there is no room beside the headline. The tilt uses Tailwind's `rotate`
// property, so it composes with the drift animation's transform.
const TILES: Tile[] = [
  { slug: "linkedin",  pos: "left-[3%] top-[22%]",   tilt: "-rotate-6", delay: "0s" },
  { slug: "instagram", pos: "left-[11%] top-[40%]",  tilt: "rotate-3",  delay: "0.4s" },
  { slug: "reddit",    pos: "left-[5%] top-[58%]",   tilt: "-rotate-3", delay: "0.8s" },
  { slug: "twitter",   pos: "right-[9%] top-[20%]",  tilt: "rotate-6",  delay: "0.2s" },
  { slug: "tiktok",    pos: "right-[3%] top-[38%]",  tilt: "-rotate-3", delay: "0.6s" },
  { slug: "youtube",   pos: "right-[10%] top-[57%]", tilt: "rotate-3",  delay: "1s" },
];

export function HeroFloatTiles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {TILES.map(({ slug, pos, tilt, delay }) => (
        <span
          key={slug}
          style={{ animationDelay: delay }}
          className={`hero-float absolute flex size-14 items-center justify-center rounded-2xl bg-white shadow-[0_18px_35px_-18px_rgba(15,17,19,0.28)] ring-1 ring-[#0F1113]/5 ${pos} ${tilt}`}
        >
          <PlatformIcon
            platform={slug}
            className="size-6"
            style={{ color: PLATFORM_BRAND_COLORS[slug] }}
          />
        </span>
      ))}
    </div>
  );
}
