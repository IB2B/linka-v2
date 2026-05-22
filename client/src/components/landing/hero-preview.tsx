import { HeroPreviewHeader } from "./hero-preview-header";
import { HeroPreviewStats } from "./hero-preview-stats";
import { HeroPreviewChart } from "./hero-preview-chart";

export function HeroPreview() {
  return (
    <div className="relative w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-[#DBE6FF] via-[#E4ECFF] to-[#EEF2FF] p-5 md:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_45%_at_20%_110%,rgba(255,255,255,0.65),transparent_60%),radial-gradient(45%_35%_at_85%_15%,rgba(255,255,255,0.55),transparent_60%)]"
      />
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-30px_rgba(15,17,19,0.25)] ring-1 ring-black/[0.04]">
        <HeroPreviewHeader />
        <HeroPreviewStats />
        <HeroPreviewChart />
      </div>
    </div>
  );
}
