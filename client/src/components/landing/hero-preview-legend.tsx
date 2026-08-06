type Props = { now: string; prev: string };

export function HeroPreviewLegend({ now, prev }: Props) {
  return (
    <div className="hidden items-center gap-3 text-[10px] tracking-tight text-[#737373] sm:flex">
      <span className="flex items-center gap-1.5">
        <span aria-hidden className="h-[2.5px] w-4 rounded-full bg-[#3B82F6]" />
        {now}
      </span>
      <span className="flex items-center gap-1.5">
        <span
          aria-hidden
          className="h-0 w-4 border-t-[1.5px] border-dashed border-[#CBD5E1]"
        />
        {prev}
      </span>
    </div>
  );
}
