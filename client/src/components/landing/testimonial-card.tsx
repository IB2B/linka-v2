import { TestimonialAvatar } from "./testimonial-avatar";
import type { Testimonial } from "./testimonial.types";

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex w-[330px] shrink-0 flex-col justify-between gap-5 rounded-xl border border-[#EBEBEB] bg-white p-5 transition-colors duration-200 hover:border-[#D6D3F5]">
      {item.metric && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#00A06C]/8 px-2 py-0.5 text-[11px] font-medium tabular-nums tracking-tight text-[#00A06C]">
          <span className="size-1 rounded-full bg-[#00A06C]" />
          {item.metric}
        </span>
      )}
      <blockquote className="text-[14.5px] leading-[1.55] tracking-tight text-[#0F1113]">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-2.5 border-t border-[#F0F0F0] pt-4">
        <TestimonialAvatar name={item.name} />
        <div className="leading-tight">
          <div className="text-[13px] font-medium tracking-tight text-[#0F1113]">
            {item.name}
          </div>
          <div className="text-[12px] tracking-tight text-[#737373]">{item.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
