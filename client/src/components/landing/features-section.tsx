import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { FeatureCard } from "./feature-card";
import { NEW_FEATURES } from "./features-data";
import { FEATURE_VISUALS } from "./feature-visuals";

type Item = { title: string };

export async function FeaturesSection() {
  const t = await getTranslations("landing.features");
  const items = t.raw("items") as Item[];
  return (
    <section id="features" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((f, i) => (
          <FeatureCard
            key={f.title}
            visual={FEATURE_VISUALS[i]}
            title={f.title}
            isNew={NEW_FEATURES.has(i)}
            newLabel={t("newLabel")}
          />
        ))}
      </div>
    </section>
  );
}
