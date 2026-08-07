import { PlatformIcon } from "@/components/accounts/platform-icon";
import type { PLATFORMS } from "@/lib/zernio/platforms";

type Platform = (typeof PLATFORMS)[number];

export function PlatformPill({ platform }: { platform: Platform }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 shadow-[0_1px_2px_rgba(15,17,19,0.04)] ring-1 ring-[#E4E4EA] transition duration-200 hover:-translate-y-0.5 hover:ring-[#CFC9F7]">
      <span
        aria-hidden
        className="flex size-6 items-center justify-center rounded-full text-white"
        style={{ background: platform.gradient ?? platform.color }}
      >
        <PlatformIcon platform={platform.slug} className="size-3.5" />
      </span>
      <span className="text-[13px] font-medium tracking-tight text-[#0F1113]">
        {platform.label}
      </span>
    </span>
  );
}
