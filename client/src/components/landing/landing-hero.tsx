import { Badge } from "@/components/ui/badge";
import { HeroCta } from "./hero-cta";
import { HeroPreview } from "./hero-preview";

export function LandingHero() {
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-6 pt-20 pb-16 text-center md:pt-28 md:pb-24">
      <Badge
        variant="outline"
        className="gap-1.5 bg-white/70 tracking-tight text-[#525252] shadow-[0_1px_0_rgba(15,17,19,0.04)] backdrop-blur"
      >
        <span className="relative flex size-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#00B67A]/70" />
          <span className="relative size-1.5 rounded-full bg-[#00B67A]" />
        </span>
        Available June 2026
      </Badge>
      <h1 className="max-w-4xl text-[46px] font-semibold leading-[0.98] tracking-[-0.04em] text-[#0F1113] md:text-[80px]">
        Stop writing posts.
        <br className="hidden md:block" />
        <span className="bg-gradient-to-br from-[#0F1113] to-[#525252] bg-clip-text text-transparent">
          Start building your audience.
        </span>
      </h1>
      <p className="max-w-xl text-[17px] leading-[1.55] tracking-tight text-[#525252]">
        Linka learns your voice, generates on-brand content across every
        platform, and publishes it at the right time — so you can focus on
        building.
      </p>
      <HeroCta />
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] tracking-tight text-[#737373]">
        <span>2,400+ creators</span>
        <span className="size-1 rounded-full bg-[#D4D4D4]" />
        <span>184M impressions shipped</span>
        <span className="size-1 rounded-full bg-[#D4D4D4]" />
        <span>7-day free trial</span>
      </div>
      <HeroPreview />
    </section>
  );
}
