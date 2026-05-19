import { getTranslations } from "next-intl/server";

import { SectionCard } from "./section-card";
import { UpcomingPostRow } from "./upcoming-post-row";
import { EmptyRow } from "./empty-row";
import type { GeneratedPost } from "@/types/post";

export async function UpcomingPosts({ posts }: { posts: GeneratedPost[] }) {
  const t = await getTranslations("dashboard.upcoming");
  return (
    <SectionCard title={t("title")} href="/dashboard/calendar" hrefLabel={t("link")}>
      {posts.length === 0 ? (
        <EmptyRow message={t("empty")} />
      ) : (
        posts.map((p) => <UpcomingPostRow key={p.id} post={p} />)
      )}
    </SectionCard>
  );
}
