import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { UseCaseCard } from "./use-case-card";
import { USE_CASES } from "./use-cases-data";

export async function UseCasesSection() {
  const t = await getTranslations("landing.useCases");
  return (
    <section
      id="who-its-for"
      className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24"
    >
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {USE_CASES.map((u) => (
          <UseCaseCard key={u.title} item={u} />
        ))}
      </div>
    </section>
  );
}
