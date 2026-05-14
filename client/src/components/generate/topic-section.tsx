"use client";

import { Newspaper, PenLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { NewsPicker } from "./news-picker";
import { TopicChooser } from "./topic-chooser";
import { getPostTypeMeta } from "@/lib/content/post-type-utils";
import type { NewsArticle, PostType } from "@/types/content";

type GenerateOpts = {
  type?: PostType;
  topic?: string;
  article?: NewsArticle;
  label: string;
};

type Props = {
  postType: PostType;
  initialNews: NewsArticle[];
  pending: boolean;
  onGenerate: (opts: GenerateOpts) => void;
};

export function TopicSection({ postType, initialNews, pending, onGenerate }: Props) {
  const meta = getPostTypeMeta(postType);
  const isNews = postType === "news_commentary";
  return (
    <Card className="min-h-[480px]">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {isNews ? <Newspaper className="size-4" /> : <PenLine className="size-4" />}
          </div>
          <div>
            <CardTitle className="text-base">
              {isNews ? "Choose an article" : "Choose a topic"}
            </CardTitle>
            <CardDescription className="mt-0.5">
              {isNews
                ? "Pick a story — we'll draft a commentary post in your voice."
                : `${meta.description}. Pick an AI suggestion or write your own.`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isNews ? (
          <NewsPicker articles={initialNews} pending={pending}
            onSelect={(article) => onGenerate({ article, label: article.title })} />
        ) : (
          <TopicChooser postType={postType} pending={pending}
            onGenerate={(topic) => onGenerate({ topic, label: topic })} />
        )}
      </CardContent>
    </Card>
  );
}
