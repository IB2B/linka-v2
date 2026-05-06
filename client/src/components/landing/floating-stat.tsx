import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  tone: "emerald" | "violet" | "rose" | "amber";
  className?: string;
};

const tones: Record<Props["tone"], string> = {
  emerald: "text-emerald-600 bg-emerald-50",
  violet: "text-violet-600 bg-violet-50",
  rose: "text-rose-600 bg-rose-50",
  amber: "text-amber-600 bg-amber-50",
};

export function FloatingStat({ icon: Icon, label, value, delta, tone, className }: Props) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl border border-white/60 bg-white/85 p-3 pr-4 shadow-[0_12px_40px_-12px_rgba(30,10,60,0.25)] backdrop-blur-xl ${className ?? ""}`}>
      <span className={`grid size-9 place-items-center rounded-xl ${tones[tone]}`}>
        <Icon className="size-4" />
      </span>
      <div className="leading-tight">
        <div className="text-[11px] font-medium text-zinc-500">{label}</div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[15px] font-semibold tracking-tight text-zinc-900 tabular-nums">{value}</span>
          {delta && <span className="text-[11px] font-medium text-emerald-600">{delta}</span>}
        </div>
      </div>
    </div>
  );
}
