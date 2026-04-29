import { PostsTableRow } from "./posts-table-row";
import type { GeneratedPost } from "@/types/post";

const HEADERS = ["Status", "Content", "Platform", "Scheduled", "Created", ""];

export function PostsTable({ posts }: { posts: GeneratedPost[] }) {
  return (
    <div className="overflow-x-auto rounded-md border bg-card">
      <table className="w-full text-left">
        <thead className="bg-muted/40 text-xs text-muted-foreground">
          <tr>
            {HEADERS.map((h) => (
              <th key={h} className="px-3 py-2 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => <PostsTableRow key={p.id} post={p} />)}
        </tbody>
      </table>
    </div>
  );
}
