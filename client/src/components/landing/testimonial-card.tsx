import type { Testimonial } from "./testimonials-data";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-7 rounded-xl border border-[#E5E5E5] bg-white p-6">
      {t.metric && (
        <span className="text-[12px] font-medium tracking-tight text-[#00B67A]">
          {t.metric}
        </span>
      )}
      <blockquote className="text-[15px] leading-[1.55] tracking-tight text-[#0F1113]">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-[#E5E5E5] pt-4">
        <span aria-hidden className={`size-8 rounded-full bg-gradient-to-br ${t.gradient}`} />
        <div className="leading-tight">
          <div
            className="text-[13px] font-medium tracking-tight text-[#0F1113]"
            dangerouslySetInnerHTML={{ __html: t.name }}
          />
          <div
            className="text-[12px] tracking-tight text-[#737373]"
            dangerouslySetInnerHTML={{ __html: t.role }}
          />
        </div>
      </figcaption>
    </figure>
  );
}
