import Link from "next/link";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Plan } from "./pricing-data";

export function PricingCard({ plan }: { plan: Plan }) {
  const hi = plan.highlighted;
  return (
    <Card
      className={`relative gap-7 rounded-2xl border-0 p-8 ring-1 ${hi ? "bg-[#6D5FF9] ring-[#6D5FF9]" : "bg-white ring-[#E5E5E5]"}`}
    >
      <div className="flex items-center justify-between">
        <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${hi ? "text-white/80" : "text-[#737373]"}`}>
          {plan.name}
        </span>
        {hi && (
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white">
            Recommended
          </span>
        )}
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className={`text-[48px] font-medium tracking-[-0.03em] ${hi ? "text-white" : "text-[#0F1113]"}`}>
            {plan.price}
          </span>
          <span className={`font-mono text-[12px] uppercase tracking-[0.16em] ${hi ? "text-white/70" : "text-[#737373]"}`}>
            {plan.period}
          </span>
        </div>
        <p
          className={`mt-2 text-[14px] leading-[1.5] ${hi ? "text-white/85" : "text-[#525252]"}`}
          dangerouslySetInnerHTML={{ __html: plan.tagline }}
        />
      </div>
      <Button
        render={<Link href="/register" />}
        nativeButton={false}
        className={`h-11 w-full rounded-full text-[13px] font-medium ${hi ? "bg-white text-[#0F1113] hover:bg-white/90" : "bg-[#0F1113] text-white hover:bg-[#0F1113]/90"}`}
      >
        {plan.cta}
      </Button>
      <ul className={`flex flex-col gap-3 border-t pt-6 ${hi ? "border-white/15" : "border-[#E5E5E5]"}`}>
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px]">
            <Check className={`mt-0.5 size-4 shrink-0 ${hi ? "text-white" : "text-[#00B67A]"}`} />
            <span
              className={hi ? "text-white/90" : "text-[#0F1113]"}
              dangerouslySetInnerHTML={{ __html: f }}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}
