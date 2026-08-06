import { getTranslations } from "next-intl/server";

const keys = ["platforms", "languages", "media", "images"] as const;

export async function HeroStats() {
  const t = await getTranslations("landing.hero.stats");
  return (
    <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#E5E5E5] bg-[#E5E5E5] md:grid-cols-4">
      {keys.map((k) => (
        <div
          key={k}
          className="flex flex-col items-center gap-2 bg-white px-6 py-7 text-center"
        >
          <p className="text-[32px] font-semibold tracking-[-0.03em] text-[#0F1113] md:text-[40px]">
            {t(`${k}.value`)}
          </p>
          <p className="text-[12.5px] tracking-tight text-[#737373]">
            {t(`${k}.label`)}
          </p>
        </div>
      ))}
    </div>
  );
}
