import { Badge } from "@/components/ui/badge";
import { HeroCta } from "./hero-cta";

export function LandingHero() {
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-6 pt-24 pb-20 text-center md:pt-32 md:pb-24">
      <Badge
        variant="outline"
        className="gap-1.5 bg-white/60 tracking-tight text-[#525252] backdrop-blur"
      >
        <span className="size-1.5 rounded-full bg-[#00B67A]" />
        Available June 2026
      </Badge>
      <h1 className="max-w-4xl text-[44px] font-semibold leading-[1.05] tracking-tight text-[#0F1113] md:text-[72px]">
        AI-led social growth for founders
        <br className="hidden md:block" /> who&rsquo;d rather ship than post.
      </h1>
      <p className="max-w-xl text-[17px] leading-[1.55] tracking-tight text-[#525252]">
        Linka writes, designs and schedules every post across LinkedIn, X,
        Instagram and TikTok — in your voice, on autopilot, without the agency
        retainer.
      </p>
      <HeroCta />
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] tracking-tight text-[#737373]">
        <span>2,400+ creators</span>
        <span className="size-1 rounded-full bg-[#D4D4D4]" />
        <span>184M impressions shipped</span>
        <span className="size-1 rounded-full bg-[#D4D4D4]" />
        <span>7-day free trial</span>
      </div>
    </section>
  );
}
