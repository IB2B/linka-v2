import { getTranslations } from "next-intl/server";

import { FaqAside } from "./faq-aside";
import { FaqItem } from "./faq-item";
import type { Faq } from "./faq-data";

export async function FaqSection() {
  const t = await getTranslations("landing.faq");
  const items = t.raw("items") as Faq[];
  return (
    <section
      id="faq"
      className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 py-24 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16"
    >
      <FaqAside eyebrow={t("eyebrow")} title={t("title")} stillStuck={t("stillStuck")} />
      <div className="flex flex-col gap-1 md:pt-1">
        {items.map((f) => (
          <FaqItem key={f.q} faq={f} />
        ))}
      </div>
    </section>
  );
}
