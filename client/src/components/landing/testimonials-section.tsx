import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { TestimonialCard } from "./testimonial-card";
import { TESTIMONIAL_GRADIENTS } from "./testimonials-data";

type Item = { quote: string; name: string; role: string; metric?: string };

export async function TestimonialsSection() {
  const t = await getTranslations("landing.testimonials");
  const items = t.raw("items") as Item[];
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {items.map((it, i) => (
          <TestimonialCard key={it.name} item={it} gradient={TESTIMONIAL_GRADIENTS[i]} />
        ))}
      </div>
    </section>
  );
}
