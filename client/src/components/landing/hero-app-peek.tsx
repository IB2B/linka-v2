import { HeroAppSidebar } from "./hero-app-sidebar";
import { HeroPreviewHeader } from "./hero-preview-header";
import { HeroPreviewStats } from "./hero-preview-stats";
import { HeroPreviewChart } from "./hero-preview-chart";
import { HeroPreviewPlatforms } from "./hero-preview-platforms";

/**
 * The app itself, rising from the bottom of the hero and cut off by the section
 * edge — so it reads as a window you are looking down into rather than a
 * screenshot dropped on the page. The card is taller than this frame; the
 * frame's overflow does the cutting, and it lands inside the platform split so
 * there is visibly more below.
 */
export function HeroAppPeek() {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/* The card runs ~613px tall, so this cuts through the platform split
          rather than landing on a section edge, which would read as finished. */}
      <div className="h-105 overflow-hidden sm:h-125 md:h-146">
        <div className="overflow-hidden rounded-t-[20px] bg-white shadow-[0_-24px_70px_-30px_rgba(35,55,105,0.28)] ring-1 ring-[#0F1113]/8">
          <div className="flex">
            <HeroAppSidebar />
            <div className="min-w-0 flex-1">
              <HeroPreviewHeader />
              <HeroPreviewStats />
              <HeroPreviewChart />
              <HeroPreviewPlatforms />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
