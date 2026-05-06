import { LandingBg } from "@/components/landing/landing-bg";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { Showcase } from "@/components/landing/showcase";
import { ShowcaseMobile } from "@/components/landing/showcase-mobile";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      <LandingBg />
      <LandingNav />
      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 pt-12 pb-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-24">
        <LandingHero />
        <Showcase />
        <ShowcaseMobile />
      </main>
    </div>
  );
}
