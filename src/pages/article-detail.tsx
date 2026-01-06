import { useParams } from "react-router";
import { Breadcrumbs } from "@/components/layout/breadcrumbs.tsx";

import { ArticleMeta } from "@/components/article/article-meta.tsx";
import { ArticleContent } from "@/components/article/article-content.tsx";
import { ArticleDisclaimer } from "@/components/article/article-disclaimer.tsx";
import { ArticleTags } from "@/components/article/article-tags.tsx";
import { ArticleComments } from "@/components/article/article-comments.tsx";
import { AuthorProfileCard } from "@/components/article/author-profile-card.tsx";

import { RelatedNewsSidebar } from "@/components/sections/related-news-sidebar.tsx";
import { RelatedNewsGrid } from "@/components/sections/related-news-grid.tsx";
import { CategorySuggestions } from "@/components/sections/category-suggestions.tsx";

import { NewsletterSubscription } from "@/components/widgets/newsletter-subscription.tsx";
import { TableOfContents } from "@/components/article/table-of-contents.tsx";
import {
  ReadingHistory,
  useTrackReading,
} from "@/components/widgets/reading-history.tsx";

import { useRSSFeeds } from "@/hooks/use-rss";
import { useArticle } from "@/hooks/use-article";
import { useEffect, useState } from "react";
import type { Article } from "@/types/news";
import { authorInfo } from "@/constant/author";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import NotFound from "./not-found";
import { cleanArticleContent } from "@/lib/clean";

export default function ArticlePage() {
  const { articles, loading: rssLoading } = useRSSFeeds();
  const { slug } = useParams<{ slug: string }>();
  const [rssArticle, setRssArticle] = useState<Article | null>(null);
  const [minimumLoading, setMinimumLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (articles.length > 0 && slug) {
      const cleanSlug = slug.replace(/\.(html|chn)$/, "");

      const foundArticle = articles.find((a) => {
        const cleanGuid = a.guid.replace(/\.(html|chn)$/, "");
        return cleanGuid === cleanSlug;
      });

      if (foundArticle) {
        setRssArticle(foundArticle);
      }
    }
  }, [articles, slug]);

  const {
    article: fullArticle,
    loading: articleLoading,
    error: articleError,
  } = useArticle(rssArticle?.link);

  useTrackReading({
    slug: slug || "",
    title: rssArticle?.title || "",
    category: rssArticle?.category || "",
  });

  const loading = rssLoading || articleLoading || minimumLoading;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (articleError || !rssArticle || !fullArticle) {
    return <NotFound />;
  }

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    {
      label: rssArticle.category || "Tin tức",
      href: `/danh-muc/${rssArticle.category
        ?.toLowerCase()
        .replace(/\s+/g, "-")}`,
    },
  ];

  const { articleTitle, articleSapo, articleContent, plainTextContent } =
    cleanArticleContent(rssArticle, fullArticle);

  return (
    <div className="min-h-screen bg-muted/10 pb-12">
      <div className="bg-background border-b mb-8">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-12 xl:grid-cols-12">
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            <article className="rounded-xl border border-border/50 bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-300 md:p-8 lg:p-10">
              <h1 className="mb-6 text-pretty text-3xl font-bold tracking-tight text-foreground lg:text-4xl lg:leading-[1.2]">
                {articleTitle}
              </h1>

              <ArticleMeta
                author={authorInfo.name}
                publishedAt={new Date(rssArticle.pubDate).toLocaleString(
                  "vi-VN",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                articleContent={plainTextContent}
              />

              <div className="my-8 rounded-lg border-l-4 border-primary bg-primary/5 p-6 shadow-inner">
                <p className="font-sans text-lg font-medium leading-relaxed text-foreground/90 lg:text-xl">
                  {articleSapo}
                </p>
              </div>

              <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                <ArticleContent content={articleContent} />
              </div>

              <div className="mt-8 flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Nguồn:{" "}
                  <a
                    href={rssArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary transition-colors hover:text-primary/80 hover:underline"
                  >
                    24h.com.vn
                  </a>
                </p>
              </div>

              <div className="mt-10 border-t pt-8">
                <AuthorProfileCard {...authorInfo} />
              </div>

              <div className="mt-8">
                <NewsletterSubscription />
              </div>

              <ArticleDisclaimer />

              <div className="mt-8">
                <ArticleTags tags={[rssArticle.category || "Tin tức"]} />
              </div>

              <div className="mt-10">
                <ArticleComments />
              </div>
            </article>

            <RelatedNewsGrid category={rssArticle.category || "Tin tức"} />
          </main>

          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-border/50 bg-card shadow-sm">
                <div className="p-4 font-semibold border-b">Mục lục</div>
                <div className="max-h-[60vh] overflow-y-auto p-2">
                  <TableOfContents content={articleContent} />
                </div>
              </div>

              <RelatedNewsSidebar category={rssArticle.category || "Tin tức"} />

              <ReadingHistory />
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <CategorySuggestions />
        </div>
      </div>
    </div>
  );
}
