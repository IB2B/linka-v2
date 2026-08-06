import { HeroPreviewHeader } from "./hero-preview-header";
import { HeroPreviewStats } from "./hero-preview-stats";
import { HeroPreviewChart } from "./hero-preview-chart";
import { HeroPreviewPlatforms } from "./hero-preview-platforms";

export function HeroPreview() {
  return (
    <div className="relative w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-[#E6EDFF] via-[#EDF1FF] to-[#F6F8FF] p-5 ring-1 ring-[#0F1113]/[0.04] md:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,17,19,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,17,19,0.04)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(75%_65%_at_50%_0%,#000_5%,transparent_80%)]"
      />
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-30px_rgba(15,17,19,0.25)] ring-1 ring-black/[0.04]">
        <HeroPreviewHeader />
        <HeroPreviewStats />
        <HeroPreviewChart />
        <HeroPreviewPlatforms />
      </div>
    </div>
  );
}
