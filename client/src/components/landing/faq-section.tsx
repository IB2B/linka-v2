import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { FaqItem } from "./faq-item";
import type { Faq } from "./faq-data";

export async function FaqSection() {
  const t = await getTranslations("landing.faq");
  const items = t.raw("items") as Faq[];
  return (
    <section id="faq" className="relative z-10 mx-auto w-full max-w-3xl px-6 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="mt-10 flex flex-col">
        {items.map((f) => (
          <FaqItem key={f.q} faq={f} />
        ))}
      </div>
    </section>
  );
}
