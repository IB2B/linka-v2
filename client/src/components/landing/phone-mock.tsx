import { Heart, MessageCircle, Repeat2 } from "lucide-react";

export function PhoneMock() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[420px] w-[220px] rounded-[36px] border border-zinc-900/10 bg-zinc-950 p-2 shadow-[0_30px_80px_-30px_rgba(30,10,60,0.5)]"
    >
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-zinc-950" />
      <div className="h-full w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-fuchsia-50 via-white to-rose-50">
        <div className="flex items-center gap-2 px-4 py-3">
          <span className="size-7 rounded-full bg-gradient-to-br from-fuchsia-400 to-rose-400" />
          <div className="leading-tight">
            <div className="text-[10px] font-semibold text-zinc-900">@linka.studio</div>
            <div className="text-[9px] text-zinc-500">Sponsored · 2h</div>
          </div>
        </div>
        <div className="mx-3 h-40 rounded-2xl bg-gradient-to-br from-amber-200 via-rose-300 to-fuchsia-400" />
        <div className="space-y-1 px-4 py-3 text-[10px] leading-snug text-zinc-700">
          <p className="font-medium text-zinc-900">Ship 3x more content this quarter.</p>
          <p>Scheduled in seconds, on-brand every time.</p>
        </div>
        <div className="flex items-center gap-4 px-4 pt-1 text-zinc-500">
          <span className="flex items-center gap-1 text-[10px]"><Heart className="size-3" /> 1.2k</span>
          <span className="flex items-center gap-1 text-[10px]"><MessageCircle className="size-3" /> 84</span>
          <span className="flex items-center gap-1 text-[10px]"><Repeat2 className="size-3" /> 32</span>
        </div>
      </div>
    </div>
  );
}
