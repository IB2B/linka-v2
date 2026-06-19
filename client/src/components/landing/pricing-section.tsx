import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { PricingCard } from "./pricing-card";
import { PLAN_HIGHLIGHTS, type Plan } from "./pricing-data";
import { getPlanPrices } from "@/lib/billing/get-plan-prices";
import { formatMoney } from "@/lib/billing/format";

// i18n plans are ordered Free, Creator, Business, Enterprise.
const TIER_BY_INDEX = ["starter", "pro", "scale", "enterprise"] as const;

export async function PricingSection() {
  const [t, prices] = await Promise.all([getTranslations("landing.pricing"), getPlanPrices()]);
  const plans = (t.raw("plans") as Plan[]).map((p, i) => {
    const live = prices[TIER_BY_INDEX[i]];
    return {
      ...p,
      highlighted: PLAN_HIGHLIGHTS[i],
      price: live ? formatMoney(live.amount, live.currency) : p.price,
    };
  });
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
