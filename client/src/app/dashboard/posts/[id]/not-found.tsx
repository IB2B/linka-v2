import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
      <h1 className="text-lg font-semibold">Post not found</h1>
      <p className="text-sm text-muted-foreground">
        It may have been deleted, or it never belonged to your account.
      </p>
      <Button render={<Link href="/dashboard/posts" />} nativeButton={false} size="sm">
        Back to posts
      </Button>
    </div>
  );
}
