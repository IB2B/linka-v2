import { SectionHeading } from "./section-heading";
import { PricingCard } from "./pricing-card";
import { PLANS } from "./pricing-data";

export function PricingSection() {
  return (
    <section id="pricing" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Pricing"
        title="One coffee a day. A whole content team."
        sub="7-day free trial on every paid plan. No card until day 7. Cancel any time."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {PLANS.map((p) => (
          <PricingCard key={p.name} plan={p} />
        ))}
      </div>
    </section>
  );
}
