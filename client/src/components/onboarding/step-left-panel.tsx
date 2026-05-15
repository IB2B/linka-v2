import { CheckIcon } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { STEP_META } from "./step-left-data";

type Props = { step: number };

export function StepLeftPanel({ step }: Props) {
  const meta = STEP_META[step - 1];
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-zinc-950 p-10 text-white">
      <div className="flex items-center gap-3 text-xl font-bold tracking-tight">
        <BrandLogo size={22} className="text-white" />
        linka
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            {meta.headline}
          </h2>
          <p className="text-base text-white/60">{meta.subtext}</p>
        </div>
        <ul className="space-y-3">
          {meta.bullets.map((b) => (
            <li key={b} className="flex items-center gap-3 text-sm text-white/80">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <CheckIcon className="size-3 text-primary" />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-white/30">© {new Date().getFullYear()} linka</p>
    </div>
  );
}
