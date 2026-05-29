import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { FeatureCard } from "./feature-card";
import { FEATURES } from "./features-data";

export async function FeaturesSection() {
  const t = await getTranslations("landing.features");
  return (
    <section id="features" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
      <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-[#E5E5E5] ring-1 ring-[#E5E5E5] sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>
    </section>
  );
}
