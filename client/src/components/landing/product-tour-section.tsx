import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { ProductTourCard } from "./product-tour-card";
import { TOUR } from "./product-tour-data";

export async function ProductTourSection() {
  const t = await getTranslations("landing.tour");
  return (
    <section
      id="tour"
      className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24"
    >
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
      <div className="mt-12 grid gap-4 lg:grid-cols-12">
        {TOUR.map((c) => (
          <ProductTourCard key={c.id} card={c} />
        ))}
      </div>
    </section>
  );
}
