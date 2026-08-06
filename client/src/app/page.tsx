import { landingFont } from "@/components/landing/landing-font";
import { LandingBg } from "@/components/landing/landing-bg";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { HeroStats } from "@/components/landing/hero-stats";
import { PlatformsStrip } from "@/components/landing/platforms-strip";
import { FeaturesSection } from "@/components/landing/features-section";
import { ProductTourSection } from "@/components/landing/product-tour-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { UseCasesSection } from "@/components/landing/use-cases-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { MetricsStrip } from "@/components/landing/metrics-strip";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { IntegrationsStrip } from "@/components/landing/integrations-strip";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCta } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Home() {
  return (
    <div
      className={`${landingFont.className} min-h-screen bg-[#EDEFF3] tracking-tight text-[#0F1113] sm:p-3`}
    >
      <div className="relative overflow-hidden bg-white ring-1 ring-[#0F1113]/5 sm:rounded-[28px]">
        <LandingBg />
        <LandingNav />
        <LandingHero />
        <div className="mx-auto w-full max-w-6xl px-6">
          <HeroStats />
        </div>
        <PlatformsStrip />
        <FeaturesSection />
        <ProductTourSection />
        <HowItWorks />
        <UseCasesSection />
        <TestimonialsSection />
        <MetricsStrip />
        <ComparisonSection />
        <PricingSection />
        <IntegrationsStrip />
        <FaqSection />
        <FinalCta />
        <LandingFooter />
      </div>
    </div>
  );
}
