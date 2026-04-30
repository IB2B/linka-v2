import { FaqItem } from "./faq-item";
import { FAQS } from "./faq-data";

export function FaqSection() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-base font-semibold">Frequently asked</h2>
        <p className="text-sm text-muted-foreground">
          Quick answers — many issues are covered here.
        </p>
      </div>
      <div className="space-y-2">
        {FAQS.map((f) => <FaqItem key={f.q} entry={f} />)}
      </div>
    </section>
  );
}
