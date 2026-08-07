import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { TestimonialMarquee } from "./testimonial-marquee";
import { MARQUEE_SPLIT } from "./testimonials-data";
import type { Testimonial } from "./testimonial.types";

export async function TestimonialsSection() {
  const t = await getTranslations("landing.testimonials");
  const items = t.raw("items") as Testimonial[];
  return (
    <section className="relative z-10 w-full py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      </div>
      {/* Full-bleed: the rows should run off both edges, not stop at the
          content column, or the loop reads as a stalled carousel. */}
      <div className="mt-12 flex flex-col gap-4">
        <TestimonialMarquee items={items.slice(0, MARQUEE_SPLIT)} duration={64} />
        <TestimonialMarquee items={items.slice(MARQUEE_SPLIT)} duration={52} reverse />
      </div>
    </section>
  );
}
