import { HeroCta } from "./hero-cta";

export function LandingHero() {
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-start gap-8 px-6 pt-24 pb-20 md:pt-32 md:pb-28">
      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#737373]">
        <span className="size-1.5 rounded-full bg-[#00B67A]" />
        Available — June 2026
      </span>
      <h1 className="max-w-4xl text-[56px] font-medium leading-[1.02] tracking-[-0.035em] text-[#0F1113] md:text-[88px]">
        AI-led social <em className="not-italic text-[#6D5FF9]">growth</em> for
        founders who&rsquo;d rather ship than post.
      </h1>
      <p className="max-w-xl text-[17px] leading-[1.5] text-[#525252]">
        Linka writes, designs and schedules every post across LinkedIn, X,
        Instagram and TikTok — in your voice, on autopilot, without the agency
        retainer.
      </p>
      <HeroCta />
      <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#737373]">
        <span>2,400+ creators</span>
        <span className="size-1 rounded-full bg-[#D4D4D4]" />
        <span>184M impressions shipped</span>
        <span className="size-1 rounded-full bg-[#D4D4D4]" />
        <span>7-day free trial</span>
      </div>
    </section>
  );
}
