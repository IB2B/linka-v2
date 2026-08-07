import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { ComparisonTable } from "./comparison-table";
import type { ComparisonRow } from "./comparison.types";

export async function ComparisonSection() {
  const t = await getTranslations("landing.comparison");
  const rows = t.raw("rows") as ComparisonRow[];
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="mt-12">
        <ComparisonTable rows={rows} colAgency={t("colAgency")} colDiy={t("colDiy")} />
      </div>
    </section>
  );
}
