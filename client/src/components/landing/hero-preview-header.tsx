import { LineChart } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function HeroPreviewHeader() {
  const t = await getTranslations("landing.heroPreview");
  const ranges = t.raw("ranges") as string[];
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#F0F0F3] px-6 py-4">
      <div className="flex min-w-0 items-center gap-2.5 text-[14px] tracking-tight text-[#0F1113]">
        <LineChart className="size-4 shrink-0 text-[#737373]" />
        <span className="truncate font-medium">{t("title")}</span>
        <span className="ml-1 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#16A34A]/10 px-2 py-0.5 text-[10.5px] font-medium tracking-tight text-[#16A34A]">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#16A34A]/70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#16A34A]" />
          </span>
          {t("live")}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <div className="hidden items-center gap-0.5 rounded-lg bg-[#F4F4F5] p-0.5 sm:flex">
          {ranges.map((r, i) => (
            <span
              key={r}
              data-active={i === ranges.length - 2}
              className="rounded-md px-2.5 py-1 text-[12px] font-medium tracking-tight text-[#737373] data-[active=true]:bg-white data-[active=true]:text-[#0F1113] data-[active=true]:shadow-[0_1px_2px_rgba(15,17,19,0.08)]"
            >
              {r}
            </span>
          ))}
        </div>
        <span className="rounded-lg border border-[#E5E5E5] px-3 py-1.5 text-[12.5px] tracking-tight text-[#525252] transition hover:border-[#0F1113] hover:text-[#0F1113]">
          {t("export")}
        </span>
      </div>
    </div>
  );
}
