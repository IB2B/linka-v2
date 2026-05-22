import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Plan } from "./pricing-data";

export function PricingCard({ plan }: { plan: Plan }) {
  const hi = plan.highlighted;
  return (
    <div
      className={`relative flex flex-col gap-6 rounded-xl border p-6 ${
        hi
          ? "border-[#6D5FF9]/35 bg-white shadow-[0_28px_70px_-30px_rgba(109,95,249,0.45)] ring-1 ring-[#6D5FF9]/20"
          : "border-[#E5E5E5] bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium tracking-tight text-[#0F1113]">
          {plan.name}
        </span>
        {hi && (
          <Badge className="bg-[#6D5FF9] tracking-tight text-white">
            Recommended
          </Badge>
        )}
      </div>
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[36px] font-semibold tracking-[-0.02em] text-[#0F1113]">
            {plan.price}
          </span>
          <span className="text-[13px] tracking-tight text-[#737373]">
            {plan.period}
          </span>
        </div>
        <p
          className="mt-2 text-[13px] leading-[1.55] tracking-tight text-[#525252]"
          dangerouslySetInnerHTML={{ __html: plan.tagline }}
        />
      </div>
      <Button
        render={<Link href="/register" />}
        nativeButton={false}
        size="lg"
        variant={hi ? "default" : "outline"}
        className="w-full"
      >
        {plan.cta}
      </Button>
      <ul className="flex flex-col gap-2.5 border-t border-[#E5E5E5] pt-5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px] tracking-tight">
            <Check className="mt-0.5 size-3.5 shrink-0 text-[#00B67A]" />
            <span
              className="text-[#0F1113]"
              dangerouslySetInnerHTML={{ __html: f }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
