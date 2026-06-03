import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { UseCaseCard } from "./use-case-card";
import { USE_CASE_ICONS } from "./use-cases-data";

type Item = { title: string; body: string; bullets: string[] };

export async function UseCasesSection() {
  const t = await getTranslations("landing.useCases");
  const items = t.raw("items") as Item[];
  return (
    <section
      id="who-its-for"
      className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24"
    >
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((u, i) => (
          <UseCaseCard key={u.title} icon={USE_CASE_ICONS[i]} title={u.title} body={u.body} bullets={u.bullets} />
        ))}
      </div>
    </section>
  );
}
