const line =
  "M 0 180 C 60 172, 100 142, 150 150 S 240 118, 290 128 S 390 78, 450 86 S 560 28, 600 36";
const area = `${line} L 600 220 L 0 220 Z`;
const grid = [40, 90, 140, 190];

export function HeroPreviewChart() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between pb-3">
        <p className="text-[12.5px] font-medium tracking-tight text-[#0F1113]">
          Impressions · last 30 days
        </p>
        <span className="rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[10.5px] font-medium tracking-tight text-[#3B82F6]">
          +28% vs prev
        </span>
      </div>
      <svg
        viewBox="0 0 600 220"
        className="h-44 w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
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
        <path
          d={line}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="600" cy="36" r="5" fill="#3B82F6" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  );
}
