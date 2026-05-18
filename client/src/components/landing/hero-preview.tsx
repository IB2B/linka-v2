import { Sparkles } from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "@/components/onboarding/platform-icons";

export function HeroPreview() {
  return (
    <div className="relative mt-6 w-full max-w-3xl">
      <div className="rounded-2xl border border-[#E5E5E5] bg-white p-2 shadow-[0_30px_80px_-30px_rgba(15,17,19,0.18),0_8px_24px_-12px_rgba(15,17,19,0.08)]">
        <div className="flex items-center gap-2 px-3 py-2">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
          <div className="ml-3 flex h-6 flex-1 items-center justify-center rounded-md bg-[#F4F4F5] text-[11px] tracking-tight text-[#737373]">
            app.linka.studio / generate
          </div>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl bg-[#E5E5E5] ring-1 ring-[#E5E5E5] sm:grid-cols-2">
          <div className="flex flex-col gap-3 bg-white p-5">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#6D5FF9]/10 px-2 py-0.5 text-[10px] font-medium tracking-tight text-[#6D5FF9]">
              <Sparkles className="size-3" /> Generating
            </span>
            <p className="text-[13px] leading-[1.55] tracking-tight text-[#0F1113]">
              Most founders post once and call it strategy. Here&rsquo;s the
              system that turned 47 drafts into 184M impressions →
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <LinkedInIcon size={14} className="text-[#0A66C2]" />
              <InstagramIcon size={14} className="text-[#E4405F]" />
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-white p-5">
            <div className="h-2 w-full rounded bg-[#F4F4F5]" />
            <div className="h-2 w-[88%] rounded bg-[#F4F4F5]" />
            <div className="h-2 w-[72%] rounded bg-[#F4F4F5]" />
            <div className="mt-2 aspect-[4/3] w-full rounded-lg bg-gradient-to-br from-violet-200 via-rose-200 to-amber-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
