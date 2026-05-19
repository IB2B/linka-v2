import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarView } from "@/components/calendar/calendar-view";
import { getPosts } from "@/lib/posts/get-posts";

export default async function CalendarPage() {
  const [posts, t, tPosts] = await Promise.all([
    getPosts(), getTranslations("calendar"), getTranslations("posts"),
  ]);
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader title={t("title")} description={t("description")} />
        <Button
          render={<Link href="/dashboard/generate" />}
          nativeButton={false}
          size="sm"
        >
          <Sparkles className="size-4" />
          {tPosts("newPost")}
        </Button>
      </div>
      <Separator className="my-2" />
      <CalendarView posts={posts} />
    </>
  );
}
