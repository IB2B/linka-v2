import { SectionHeading } from "./section-heading";
import { FeatureCard } from "./feature-card";
import { FEATURES } from "./features-data";

export function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Features"
        title="Replace six tools. Keep one workspace."
        sub="Linka is the writer, the designer, the scheduler and the analyst. One subscription, one calendar, every channel."
      />
      <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-[#E5E5E5] ring-1 ring-[#E5E5E5] sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>
    </section>
  );
}
