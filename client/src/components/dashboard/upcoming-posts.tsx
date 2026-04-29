import { SectionCard } from "./section-card";
import { UpcomingPostRow } from "./upcoming-post-row";
import { EmptyRow } from "./empty-row";
import type { GeneratedPost } from "@/types/post";

export function UpcomingPosts({ posts }: { posts: GeneratedPost[] }) {
  return (
    <SectionCard title="Upcoming" href="/dashboard/calendar" hrefLabel="Calendar">
      {posts.length === 0 ? (
        <EmptyRow message="Nothing scheduled. Plan your first post." />
      ) : (
        posts.map((p) => <UpcomingPostRow key={p.id} post={p} />)
      )}
    </SectionCard>
  );
}
