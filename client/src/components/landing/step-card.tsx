import type { Step } from "./steps-data";

type Props = { step: Step; stepLabel: string };

export function StepCard({ step, stepLabel }: Props) {
  return (
    <div className="relative flex flex-col gap-3 border-t border-[#E5E5E5] pt-6">
      <span
        aria-hidden
        className="absolute -top-1 right-0 text-[44px] font-semibold leading-none tracking-tight text-[#0F1113]/6"
      >
        {step.n}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6D5FF9]">
        {stepLabel} {step.n}
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
