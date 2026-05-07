import { SectionHeading } from "./section-heading";
import { FaqItem } from "./faq-item";
import { FAQS } from "./faq-data";

export function FaqSection() {
  return (
    <section id="faq" className="relative z-10 mx-auto w-full max-w-3xl px-6 py-32">
      <SectionHeading
        eyebrow="06 — Questions"
        title={<>Things people ask before signing.</>}
      />
      <div className="mt-12 flex flex-col">
        {FAQS.map((f) => (
          <FaqItem key={f.q} faq={f} />
        ))}
      </div>
    </section>
  );
}
