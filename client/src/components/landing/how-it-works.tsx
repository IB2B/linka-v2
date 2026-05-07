import { SectionHeading } from "./section-heading";
import { StepCard } from "./step-card";
import { STEPS } from "./steps-data";

export function HowItWorks() {
  return (
    <section id="process" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
      <SectionHeading
        eyebrow="02 — Process"
        title={
          <>
            From signup to first post in{" "}
            <span className="text-[#00B67A]">three minutes.</span>
          </>
        }
      />
      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {STEPS.map((s) => (
          <StepCard key={s.n} step={s} />
        ))}
      </div>
    </section>
  );
}
