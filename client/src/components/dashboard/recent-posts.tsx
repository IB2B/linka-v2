import { SectionCard } from "./section-card";
import { RecentPostRow } from "./recent-post-row";
import { EmptyRow } from "./empty-row";
import type { GeneratedPost } from "@/types/post";

export function RecentPosts({ posts }: { posts: GeneratedPost[] }) {
  return (
    <SectionCard title="Recent posts" href="/dashboard/posts">
      {posts.length === 0 ? (
        <EmptyRow message="You haven't generated any posts yet." />
      ) : (
        posts.map((p) => <RecentPostRow key={p.id} post={p} />)
      )}
    </SectionCard>
  );
}
