import { getTranslations } from "next-intl/server";

const line =
  "M 0 180 C 60 172, 100 142, 150 150 S 240 118, 290 128 S 390 78, 450 86 S 560 28, 600 36";
const prev =
  "M 0 198 C 70 194, 130 184, 200 178 S 360 156, 440 148 S 560 116, 600 108";
const area = `${line} L 600 220 L 0 220 Z`;
const grid = [40, 90, 140, 190];

export async function HeroPreviewChart() {
  const t = await getTranslations("landing.heroPreview");
  return (
    <div className="p-5">
      <div className="flex items-center justify-between pb-3">
        <p className="text-[12.5px] font-medium tracking-tight text-[#0F1113]">
          {t("chartTitle")}
        </p>
        <span className="rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[10.5px] font-medium tracking-tight text-[#3B82F6]">
          {t("vsPrev")}
        </span>
      </div>
      <div className="hp-rise relative">
        <svg viewBox="0 0 600 220" className="h-44 w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="hp-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {grid.map((y) => (
            <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="#F4F4F5" />
          ))}
          <path d={area} fill="url(#hp-area)" />
          <path d={prev} fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 5" strokeLinecap="round" />
          <path className="hp-line" d={line} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="pointer-events-none absolute right-[6px] top-[16.4%] -translate-y-1/2">
          <span className="absolute inset-0 size-2.5 animate-ping rounded-full bg-[#3B82F6]/50" />
          <span className="relative block size-2.5 rounded-full border-2 border-white bg-[#3B82F6] shadow-[0_0_0_4px_rgba(59,130,246,0.12)]" />
        </span>
      </div>
    </div>
  );
}
