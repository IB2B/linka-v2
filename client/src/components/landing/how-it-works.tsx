import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { StepCard } from "./step-card";
import { STEP_NUMBERS } from "./steps-data";

type Step = { title: string; body: string };

export async function HowItWorks() {
  const t = await getTranslations("landing.process");
  const steps = t.raw("steps") as Step[];
  return (
    <section id="process" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <StepCard key={STEP_NUMBERS[i]} n={STEP_NUMBERS[i]} title={s.title} body={s.body} stepLabel={t("stepLabel")} />
        ))}
      </div>
    </section>
  );
}
