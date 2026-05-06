import { Sparkles, Image as ImageIcon, Calendar, Hash } from "lucide-react";

const tools = [
  { icon: Sparkles, label: "Rewrite" },
  { icon: ImageIcon, label: "Image" },
  { icon: Hash, label: "Hashtags" },
  { icon: Calendar, label: "Schedule" },
];

export function PostPreviewCard() {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[360px] overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-[0_30px_80px_-30px_rgba(30,10,60,0.45)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3">
        <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-rose-400 to-fuchsia-500 text-white">
          <Sparkles className="size-3.5" />
        </span>
        <div className="text-[13px] font-medium text-zinc-900">New post · LinkedIn</div>
        <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
          Generated
        </span>
      </div>
      <div className="space-y-2 px-4 py-4 text-[13px] leading-relaxed text-zinc-800">
        <p className="font-medium text-zinc-900">3 hooks I stole from $40M founders 👇</p>
        <p className="text-zinc-700">
          Most creators bury their best line on row 4. Here&rsquo;s the structure that doubled my reply rate this month:
        </p>
        <p className="text-zinc-500">1. Promise · 2. Pattern break · 3. Specific number ✨</p>
      </div>
      <div className="mx-4 mb-4 h-32 rounded-xl bg-gradient-to-br from-fuchsia-200 via-rose-200 to-amber-200" />
      <div className="flex items-center gap-1 border-t border-zinc-100 px-3 py-2">
        {tools.map((t) => (
          <span
            key={t.label}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-zinc-600"
          >
            <t.icon className="size-3.5" />
            {t.label}
          </span>
        ))}
        <span className="ml-auto rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-medium text-white">
          Schedule
        </span>
      </div>
    </div>
  );
}
