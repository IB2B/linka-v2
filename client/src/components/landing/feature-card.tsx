import type { ComponentType } from "react";

type Props = {
  visual: ComponentType;
  title: string;
  isNew?: boolean;
  newLabel: string;
};

export function FeatureCard({ visual: Visual, title, isNew, newLabel }: Props) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-[#EBEBEB] bg-white p-2.5 transition-colors duration-200 hover:border-[#D6D3F5]">
      <Visual />
      <div className="flex items-start justify-between gap-2 px-1 pb-1">
        <h3 className="text-[14px] font-semibold leading-snug tracking-tight text-[#0F1113]">
          {title}
        </h3>
        {isNew && (
          <span className="mt-px shrink-0 text-[10.5px] font-medium leading-none tracking-tight text-[#00A06C]">
            {newLabel}
          </span>
        )}
      </div>
    </div>
  );
}
