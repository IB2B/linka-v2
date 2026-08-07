import { TestimonialCard } from "./testimonial-card";
import type { Testimonial } from "./testimonial.types";

type Props = {
  items: Testimonial[];
  /** Seconds for one full pass. Rows differ so they never lock in step. */
  duration: number;
  reverse?: boolean;
};

export function TestimonialMarquee({ items, duration, reverse }: Props) {
  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
      <div
        className="marquee-track flex w-max gap-4"
        style={
          {
            "--marquee-duration": `${duration}s`,
            "--marquee-direction": reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {/* The list twice — the track travels -50% and lands on the copy. */}
        {[0, 1].map((pass) => (
          <div key={pass} className="flex gap-4" aria-hidden={pass === 1}>
            {items.map((it) => (
              <TestimonialCard key={it.name} item={it} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
