import { SearchX } from "lucide-react";

export function PostsEmptyFiltered() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed py-16 text-center">
      <SearchX className="size-6 text-muted-foreground" />
      <p className="text-sm font-medium">No posts match your filters</p>
      <p className="text-xs text-muted-foreground">
        Try a different search term or clear the status filter.
      </p>
    </div>
  );
}
