import Link from "next/link";
import { Sparkles } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarView } from "@/components/calendar/calendar-view";
import { getPosts } from "@/lib/posts/get-posts";

export default async function CalendarPage() {
  const posts = await getPosts();
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Calendar"
          description="Plan, review, and reschedule your social posts at a glance."
        />
        <Button
          render={<Link href="/dashboard/generate" />}
          nativeButton={false}
          size="sm"
        >
          <Sparkles className="size-4" />
          New post
        </Button>
      </div>
      <Separator className="my-2" />
      <CalendarView posts={posts} />
    </>
  );
}
