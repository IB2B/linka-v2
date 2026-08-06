import { HeroAppSidebar } from "./hero-app-sidebar";
import { HeroPreviewHeader } from "./hero-preview-header";
import { HeroPreviewStats } from "./hero-preview-stats";
import { HeroPreviewChart } from "./hero-preview-chart";
import { HeroPreviewPlatforms } from "./hero-preview-platforms";

/**
 * The app itself, rising from the bottom of the hero and cut off by the section
 * edge — so it reads as a window you are looking down into rather than a
 * screenshot dropped on the page. The inner card is taller than this frame; the
 * frame's overflow does the cutting.
 */
export function HeroAppPeek() {
  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-0">
      <div className="h-[300px] overflow-hidden sm:h-[360px] md:h-[420px]">
        <div className="rounded-t-2xl bg-white shadow-[0_-30px_80px_-40px_rgba(15,17,19,0.28)] ring-1 ring-[#0F1113]/[0.07]">
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
