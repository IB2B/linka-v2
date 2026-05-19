import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { StepCard } from "./step-card";
import { STEPS } from "./steps-data";

export async function HowItWorks() {
  const t = await getTranslations("landing.process");
  return (
    <section id="process" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {STEPS.map((s) => (
          <StepCard key={s.n} step={s} stepLabel={t("stepLabel")} />
        ))}
      </div>
    </section>
  );
}
