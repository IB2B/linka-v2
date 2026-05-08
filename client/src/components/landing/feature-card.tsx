import type { Feature } from "./features-data";

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div className="flex flex-col gap-3 bg-white p-7 transition hover:bg-[#FAFAFA]">
      <Icon className="size-5 text-[#6D5FF9]" strokeWidth={1.75} />
      <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-[#0F1113]">
        {feature.title}
      </h3>
      <p className="text-[14px] leading-[1.6] tracking-tight text-[#525252]">
        {feature.body}
      </p>
    </div>
  );
}
