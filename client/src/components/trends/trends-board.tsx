"use client";

import { useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { toast } from "sonner";

import { refreshTrendsAction } from "@/app/dashboard/trends/actions";
import { SUGGESTED_TOPICS } from "@/lib/trends/suggested-topics";
import { TopicPicker } from "./topic-picker";
import { TrendsMeta } from "./trends-meta";
import { GenSettingsProvider } from "./gen-settings-context";

type Props = {
  topics?: string[];
  count: number;
  fetchedAt: string | null;
  children: React.ReactNode;
};

export function TrendsBoard({ topics, count, fetchedAt, children }: Props) {
  const locale = useLocale();
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState(locale);
  const [withImage, setWithImage] = useState(true);
  const [pending, start] = useTransition();
  const chips = topics && topics.length > 0 ? topics : SUGGESTED_TOPICS;

  function refresh(value?: string) {
    const t = (value ?? topic).trim();
    if (value !== undefined) setTopic(value);
    start(async () => {
      const r = await refreshTrendsAction(t || undefined);
      if ("error" in r) toast.error(r.error);
      else toast.success(`Found ${r.refreshed} trends${t ? ` about ${t}` : ""}`);
    });
  }

  return (
    <GenSettingsProvider value={{ language, withImage }}>
      <div className="flex flex-col gap-4">
        <TopicPicker
          topic={topic} onTopic={setTopic} onRefresh={refresh} pending={pending} chips={chips}
          language={language} withImage={withImage}
          onLanguage={setLanguage} onWithImage={setWithImage}
        />
        <TrendsMeta count={count} fetchedAt={fetchedAt} pending={pending} />
        <div className={`transition-opacity ${pending ? "pointer-events-none opacity-50" : ""}`}>
          {children}
        </div>
      </div>
    </GenSettingsProvider>
  );
}
