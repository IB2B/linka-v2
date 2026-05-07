import { SectionHeading } from "./section-heading";
import { FeatureCard } from "./feature-card";
import { FEATURES } from "./features-data";

export function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
      <SectionHeading
        eyebrow="01 — Capabilities"
        title={
          <>
            Replace six tools.{" "}
            <span className="text-[#6D5FF9]">Keep one workspace.</span>
          </>
        }
        sub="Linka is the writer, the designer, the scheduler and the analyst. One subscription, one calendar, every channel."
      />
      <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <FeatureCard
            key={f.title}
            feature={f}
            n={String(i + 1).padStart(2, "0")}
          />
        ))}
      </div>
    </section>
  );
}
