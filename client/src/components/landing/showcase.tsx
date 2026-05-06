import { TrendingUp, Eye, CalendarCheck } from "lucide-react";
import { PostPreviewCard } from "./post-preview-card";
import { PhoneMock } from "./phone-mock";
import { FloatingStat } from "./floating-stat";

export function Showcase() {
  return (
    <div className="relative hidden h-[560px] w-full lg:block">
      <div className="absolute right-0 top-10 rotate-[4deg]">
        <PhoneMock />
      </div>
      <div className="absolute left-2 top-24 -rotate-[3deg]">
        <PostPreviewCard />
      </div>
      <FloatingStat
        icon={TrendingUp}
        tone="emerald"
        label="Engagement"
        value="38.2%"
        delta="+12.4%"
        className="absolute -top-2 left-10 rotate-[-4deg]"
      />
      <FloatingStat
        icon={Eye}
        tone="violet"
        label="Reach this week"
        value="184k"
        delta="+22%"
        className="absolute right-2 top-[300px] rotate-[3deg]"
      />
      <FloatingStat
        icon={CalendarCheck}
        tone="rose"
        label="Post scheduled"
        value="Tue 9:00 AM"
        className="absolute bottom-6 left-20 rotate-[-2deg]"
      />
    </div>
  );
}
