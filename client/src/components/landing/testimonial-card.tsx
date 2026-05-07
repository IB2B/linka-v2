import { Card } from "@/components/ui/card";
import type { Testimonial } from "./testimonials-data";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <Card className="flex h-full flex-col justify-between gap-8 rounded-2xl border-0 bg-white p-7 ring-1 ring-[#E5E5E5]">
      {t.metric && (
        <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#00B67A]">
          <span className="size-1 rounded-full bg-[#00B67A]" />
          {t.metric}
        </span>
      )}
      <blockquote className="text-[18px] leading-[1.5] tracking-tight text-[#0F1113]">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-[#E5E5E5] pt-5">
        <span aria-hidden className={`size-9 rounded-full bg-gradient-to-br ${t.gradient}`} />
        <div className="leading-tight">
          <div
            className="text-[13px] font-medium text-[#0F1113]"
            dangerouslySetInnerHTML={{ __html: t.name }}
          />
          <div
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#737373]"
            dangerouslySetInnerHTML={{ __html: t.role }}
          />
        </div>
      </figcaption>
    </Card>
  );
}
