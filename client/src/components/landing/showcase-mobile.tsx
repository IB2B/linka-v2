import { TrendingUp, CalendarCheck } from "lucide-react";
import { PostPreviewCard } from "./post-preview-card";
import { FloatingStat } from "./floating-stat";

export function ShowcaseMobile() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] lg:hidden">
      <FloatingStat
        icon={TrendingUp}
        tone="emerald"
        label="Engagement"
        value="38.2%"
        delta="+12.4%"
        className="absolute -top-3 -left-2 z-10 rotate-[-4deg]"
      />
      <FloatingStat
        icon={CalendarCheck}
        tone="rose"
        label="Post scheduled"
        value="Tue 9:00 AM"
        className="absolute -bottom-4 -right-2 z-10 rotate-[2deg]"
      />
      <PostPreviewCard />
    </div>
  );
}
