import { getTranslations } from "next-intl/server";

import { SectionCard } from "./section-card";
import { RecentPostRow } from "./recent-post-row";
import { EmptyRow } from "./empty-row";
import type { GeneratedPost } from "@/types/post";

export async function RecentPosts({ posts }: { posts: GeneratedPost[] }) {
  const t = await getTranslations("dashboard.recent");
  return (
    <SectionCard title={t("title")} href="/dashboard/posts" hrefLabel={t("viewAll")}>
      {posts.length === 0 ? (
        <EmptyRow message={t("empty")} />
      ) : (
        posts.map((p) => <RecentPostRow key={p.id} post={p} />)
      )}
    </SectionCard>
  );
}
