import { Card, CardContent } from "@/components/ui/card";
import type { Feature } from "./features-data";

export function FeatureCard({ feature, n }: { feature: Feature; n: string }) {
  const Icon = feature.icon;
  return (
    <Card className="gap-6 rounded-2xl border-0 bg-white p-7 ring-1 ring-[#E5E5E5] transition hover:ring-[#0F1113]/20 hover:shadow-[0_18px_50px_-30px_rgba(15,17,19,0.18)]">
      <div className="flex items-center justify-between">
        <span className="grid size-10 place-items-center rounded-lg bg-[#6D5FF9]/10 text-[#6D5FF9] ring-1 ring-[#6D5FF9]/20">
          <Icon className="size-5" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A3A3A3]">
          {n}
        </span>
      </div>
      <CardContent className="flex flex-col gap-2.5 px-0">
        <h3 className="text-[18px] font-medium tracking-tight text-[#0F1113]">
          {feature.title}
        </h3>
        <p className="text-[14px] leading-[1.6] text-[#525252]">{feature.body}</p>
      </CardContent>
    </Card>
  );
}
