import { getTranslations } from "next-intl/server";

import { SectionHeading } from "./section-heading";
import { ProductTourCard } from "./product-tour-card";
import { TOUR_META } from "./product-tour-data";
import { TourMockVoice } from "./tour-mock-voice";
import { TourMockCalendar } from "./tour-mock-calendar";
import { TourMockFanout } from "./tour-mock-fanout";
import { TourMockAvatar } from "./tour-mock-avatar";
import { TourMockInbox } from "./tour-mock-inbox";
import { TourMockRadar } from "./tour-mock-radar";

type Item = { tag: string; title: string; body: string };

export async function ProductTourSection() {
  const t = await getTranslations("landing.tour");
  const items = t.raw("items") as Item[];
  const m = t.raw("mocks");
  const mocks = [
    <TourMockVoice key="v" c={m.voice} />,
    <TourMockCalendar key="c" c={m.calendar} />,
    <TourMockFanout key="f" c={m.fanout} />,
    <TourMockAvatar key="a" c={m.avatar} />,
    <TourMockInbox key="i" c={m.inbox} />,
    <TourMockRadar key="r" c={m.radar} />,
  ];
  return (
    <section id="tour" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
      <div className="mt-12 grid gap-4 lg:grid-cols-12">
        {TOUR_META.map((meta, i) => (
          <ProductTourCard key={meta.id} span={meta.span} item={items[i]} mock={mocks[i]} />
        ))}
      </div>
    </section>
  );
}
