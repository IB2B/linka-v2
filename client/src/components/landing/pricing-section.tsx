import { SectionHeading } from "./section-heading";
import { PricingCard } from "./pricing-card";
import { PLANS } from "./pricing-data";

export function PricingSection() {
  return (
    <section id="pricing" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
      <SectionHeading
        eyebrow="05 — Pricing"
        title={
          <>
            One coffee a day.{" "}
            <span className="text-[#6D5FF9]">A whole content team.</span>
          </>
        }
        sub="7-day free trial on every paid plan. No card until day 7. Cancel any time."
      />
      <div className="mt-16 grid gap-3 md:grid-cols-3">
        {PLANS.map((p) => (
          <PricingCard key={p.name} plan={p} />
        ))}
      </div>
    </section>
  );
}
