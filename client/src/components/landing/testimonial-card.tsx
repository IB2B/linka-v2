import { Quote } from "lucide-react";

type Item = { quote: string; name: string; role: string; metric?: string };
type Props = { item: Item; gradient: string };

export function TestimonialCard({ item, gradient }: Props) {
  return (
    <figure className="relative flex h-full flex-col justify-between gap-7 rounded-xl border border-[#E5E5E5] bg-white p-6 transition hover:border-[#D4D4D4]">
      <Quote
        aria-hidden
        className="absolute right-5 top-5 size-5 text-[#0F1113]/8"
        strokeWidth={2}
      />
      {item.metric && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#00B67A]/10 px-2 py-0.5 text-[11px] font-medium tracking-tight text-[#00B67A]">
          <span className="size-1 rounded-full bg-[#00B67A]" />
          {item.metric}
        </span>
      )}
      <blockquote className="text-[15px] leading-[1.55] tracking-tight text-[#0F1113]">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-[#E5E5E5] pt-4">
        <span aria-hidden className={`size-8 rounded-full bg-gradient-to-br ${gradient}`} />
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
