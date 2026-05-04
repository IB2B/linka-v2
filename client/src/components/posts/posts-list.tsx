import { PostCard } from "./post-card";
import { SelectableCard } from "./selectable-card";
import type { GeneratedPost } from "@/types/post";

export function PostsList({ posts }: { posts: GeneratedPost[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((p) => (
        <SelectableCard key={p.id} id={p.id}>
          <PostCard post={p} />
        </SelectableCard>
      ))}
    </div>
  );
}
