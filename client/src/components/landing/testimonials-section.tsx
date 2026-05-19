import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { TestimonialCard } from "./testimonial-card";
import { TESTIMONIALS } from "./testimonials-data";

export async function TestimonialsSection() {
  const t = await getTranslations("landing.testimonials");
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((tt) => (
          <TestimonialCard key={tt.name} t={tt} />
        ))}
      </div>
    </section>
  );
}
