type Props = { n: string; title: string; body: string; isLast: boolean };

export function StepCard({ n, title, body, isLast }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#6D5FF9] text-[12px] font-semibold tabular-nums text-white">
          {n}
        </span>
        {/* -mr-8 pushes the rule across the grid gap so the line reads as one
            continuous track through all three steps. */}
        {!isLast && (
          <span aria-hidden className="-mr-8 hidden h-px flex-1 bg-[#E5E5E5] md:block" />
        )}
      </div>
      <div>
        <h3 className="text-[18px] font-semibold tracking-tight text-[#0F1113]">
          {title}
        </h3>
        <p className="mt-2 max-w-[34ch] text-[14px] leading-[1.6] tracking-tight text-[#525252]">
          {body}
        </p>
      </div>
    </div>
  );
}
