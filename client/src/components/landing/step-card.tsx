import type { Step } from "./steps-data";

export function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex flex-col gap-3 border-t border-[#E5E5E5] pt-6">
      <span className="text-[12px] font-medium tracking-tight text-[#6D5FF9]">
        Step {step.n}
      </span>
      <h3
        className="text-[18px] font-semibold tracking-tight text-[#0F1113]"
        dangerouslySetInnerHTML={{ __html: step.title }}
      />
      <p
        className="text-[14px] leading-[1.6] tracking-tight text-[#525252]"
        dangerouslySetInnerHTML={{ __html: step.body }}
      />
    </div>
  );
}
