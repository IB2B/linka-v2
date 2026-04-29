import Link from "next/link";
import { Sparkles, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PostsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <FileText className="size-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium">No posts yet</h3>
        <p className="max-w-xs text-sm text-muted-foreground">
          Generate your first draft and it will show up here.
        </p>
      </div>
      <Button
        render={<Link href="/dashboard/generate" />}
        nativeButton={false}
        size="sm"
      >
        <Sparkles className="size-4" />
        Generate a post
      </Button>
    </div>
  );
}
