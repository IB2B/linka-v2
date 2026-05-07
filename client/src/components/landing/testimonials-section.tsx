import { SectionHeading } from "./section-heading";
import { TestimonialCard } from "./testimonial-card";
import { TESTIMONIALS } from "./testimonials-data";

export function TestimonialsSection() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
      <SectionHeading
        eyebrow="03 — Words from clients"
        title={<>The work speaks. They speak too.</>}
      />
      <div className="mt-16 grid gap-3 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </div>
    </section>
  );
}
