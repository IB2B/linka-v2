import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { PricingCard } from "./pricing-card";
import { PLAN_HIGHLIGHTS, type Plan } from "./pricing-data";

export async function PricingSection() {
  const t = await getTranslations("landing.pricing");
  const plans = (t.raw("plans") as Plan[]).map((p, i) => ({ ...p, highlighted: PLAN_HIGHLIGHTS[i] }));
  return (
    <section id="pricing" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => (
          <PricingCard key={p.name} plan={p} />
        ))}
      </div>
    </section>
  );
}
