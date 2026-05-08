import { SectionHeading } from "./section-heading";
import { TestimonialCard } from "./testimonial-card";
import { TESTIMONIALS } from "./testimonials-data";

export function TestimonialsSection() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Customers"
        title="The work speaks. They speak too."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </div>
    </section>
  );
}
