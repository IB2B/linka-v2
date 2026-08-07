import { landingFont } from "@/components/landing/landing-font";
import { LandingBg } from "@/components/landing/landing-bg";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { PlatformsStrip } from "@/components/landing/platforms-strip";
import { FeaturesSection } from "@/components/landing/features-section";
import { ProductTourSection } from "@/components/landing/product-tour-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { UseCasesSection } from "@/components/landing/use-cases-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { MetricsStrip } from "@/components/landing/metrics-strip";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCta } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Home() {
  return (
    <div
      className={`${landingFont.className} min-h-screen bg-[#EDEFF3] tracking-tight text-[#0F1113] sm:p-3`}
    >
      {/* overflow-clip, not overflow-hidden: hidden would make this a scroll
          container, which hijacks view() timelines and position: sticky from
          the document. clip still respects the rounded corners. */}
      <div className="relative overflow-clip bg-white ring-1 ring-[#0F1113]/5 sm:rounded-[28px]">
        <LandingBg />
        <LandingNav />
        <LandingHero />
        {/* Nav and hero stay outside the reveal — the first thing you see
            should already be there. */}
        <div className="reveal">
          <PlatformsStrip />
          <FeaturesSection />
          <ProductTourSection />
          <HowItWorks />
          <UseCasesSection />
          <TestimonialsSection />
          <MetricsStrip />
          <ComparisonSection />
          <PricingSection />
          <FaqSection />
          <FinalCta />
          <LandingFooter />
        </div>
      </div>
    </div>
  );
}
