import { Check } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const HIGHLIGHTS = [
  "Generate on-brand posts in your voice",
  "Schedule across LinkedIn, X, Instagram and more",
  "Track what works with weekly analytics",
];

export function AuthShowcase() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(60%_55%_at_30%_20%,#000_0%,transparent_80%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(109,95,249,0.20),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_70%)]"
      />

      <div className="relative z-10 flex items-center gap-2 text-base font-semibold tracking-tight">
        <BrandLogo size={22} className="text-zinc-50" />
        linka<span className="text-zinc-500">.studio</span>
      </div>

      <div className="relative z-10 mt-auto space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em]">
            Stop writing posts.
            <br />
            <span className="text-zinc-400">Start building your audience.</span>
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            Linka writes, designs and schedules every social post in your voice
            — so you stay top-of-mind without staying online.
          </p>
        </div>

        <ul className="space-y-2.5">
          {HIGHLIGHTS.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2.5 text-sm tracking-tight text-zinc-300"
            >
              <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-400" strokeWidth={2.5} />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 border-t border-zinc-800 pt-5 text-xs tracking-tight text-zinc-500">
          <span className="font-medium text-zinc-300">2,400+ creators</span>
          <span className="size-1 rounded-full bg-zinc-700" />
          <span>184M impressions shipped</span>
        </div>
      </div>
    </>
  );
}
