"use client";

import { Megaphone, Newspaper, PenLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { NewsTopicPanel } from "./news-topic-panel";
import { TopicChooser } from "./topic-chooser";
import { ProductTopicPanel } from "./product-topic-panel";
import { getPostTypeMeta } from "@/lib/content/post-type-utils";
import type { GenOpts } from "./use-generate";
import type { NewsArticle, PostType } from "@/types/content";
import type { Product } from "@/types/product";

type Props = {
  postType: PostType;
  initialNews: NewsArticle[];
  products: Product[];
  pending: boolean;
  language: string;
  onGenerate: (opts: GenOpts) => void;
};

export function TopicSection({ postType, initialNews, products, pending, language, onGenerate }: Props) {
  const meta = getPostTypeMeta(postType);
  const kind = postType === "news_commentary" ? "news" : postType === "promote_product" ? "product" : "topic";
  const Icon = kind === "news" ? Newspaper : kind === "product" ? Megaphone : PenLine;
  const title = { news: "Choose an article", product: "Choose a product", topic: "Choose a topic" }[kind];
  const description = {
    news: "Pick one story, then press Generate — we'll draft a commentary post in your voice.",
    product: "Pick the product to promote. Each post takes a different angle, so your feed never reads like one ad.",
    topic: `${meta.description}. Pick one AI suggestion or write your own.`,
  }[kind];

  return (
    <Card className="min-h-[480px]">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4" />
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="mt-0.5">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {kind === "news" ? (
          <NewsTopicPanel articles={initialNews} pending={pending}
            onGenerate={(article) => onGenerate({ article, label: article.title })} />
        ) : kind === "product" ? (
          <ProductTopicPanel products={products} pending={pending}
            onGenerate={(productId, label, topic) => onGenerate({ productId, topic, label })} />
        ) : (
          <TopicChooser postType={postType} pending={pending} language={language}
            onGenerate={(topic) => onGenerate({ topic, label: topic })} />
        )}
      </CardContent>
    </Card>
  );
}
