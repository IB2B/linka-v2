import { LineChart, BellOff, Bookmark } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function HeroPreviewHeader() {
  const t = await getTranslations("landing.heroPreview");
  return (
    <div className="flex items-center justify-between border-b border-[#F4F4F5] px-5 py-3">
      <div className="flex items-center gap-2 text-[12.5px] tracking-tight text-[#0F1113]">
        <LineChart className="size-3.5 text-[#737373]" />
        <span className="font-medium">{t("title")}</span>
        <span className="hidden text-[#A3A3A3] sm:inline">·</span>
        <span className="hidden text-[#737373] sm:inline">{t("period")}</span>
        <span className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[#16A34A]/10 px-2 py-0.5 text-[10px] font-medium tracking-tight text-[#16A34A]">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#16A34A]/70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#16A34A]" />
          </span>
          {t("live")}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="flex size-7 items-center justify-center rounded-md border border-[#E5E5E5] text-[#737373] transition hover:bg-[#FAFAFA] hover:text-[#0F1113]">
          <BellOff className="size-3.5" />
        </span>
        <span className="flex size-7 items-center justify-center rounded-md border border-[#E5E5E5] text-[#737373] transition hover:bg-[#FAFAFA] hover:text-[#0F1113]">
          <Bookmark className="size-3.5" />
        </span>
        <span className="rounded-md border border-[#E5E5E5] px-2.5 py-1 text-[11.5px] tracking-tight text-[#525252] transition hover:border-[#0F1113] hover:text-[#0F1113]">
          {t("export")}
        </span>
      </div>
    </div>
  );
}
