import { Sparkles } from "lucide-react";
import { HeroCta } from "./hero-cta";
import { HeroTrustRow } from "./hero-trust-row";

export function LandingHero() {
  return (
    <div className="flex flex-col gap-7">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/70 px-3 py-1 text-[12px] font-medium text-zinc-700 backdrop-blur">
        <Sparkles className="size-3.5 text-amber-500" />
        New — AI image generation in beta
      </span>
      <h1 className="text-[56px] font-semibold leading-[1.02] tracking-[-0.03em] text-zinc-950 md:text-[64px]">
        Posts that
        <br />
        actually <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">convert.</span>
      </h1>
      <p className="max-w-md text-[17px] leading-relaxed text-zinc-600">
        Linka writes, designs and schedules every post across LinkedIn, Instagram and X — in your voice, on your calendar, without the agency price tag.
      </p>
      <HeroCta />
      <HeroTrustRow />
    </div>
  );
}
