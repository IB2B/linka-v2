

import { LandingBg } from "@/components/landing/landing-bg";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { SocialProofBar } from "@/components/landing/social-proof-bar";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCta } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAFAFA] font-sans text-[#0F1113]">
      <LandingBg />
      <LandingNav />
      <LandingHero />
      <SocialProofBar />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <ComparisonSection />
      <PricingSection />
      <FaqSection />
      <FinalCta />
      <LandingFooter />
    </div>
  );
}
