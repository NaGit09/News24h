import { useParams } from "react-router";
import { Breadcrumbs } from "@/components/layout/breadcrumbs.tsx";

import { ArticleMeta } from "@/components/article/article-meta.tsx";
import { ArticleContent } from "@/components/article/article-content.tsx";
import { ArticleDisclaimer } from "@/components/article/article-disclaimer.tsx";
import { ArticleTags } from "@/components/article/article-tags.tsx";
import { ArticleComments } from "@/components/article/article-comments.tsx";
import { AuthorProfileCard } from "@/components/article/author-profile-card.tsx";
import { PrintHeader } from "@/components/article/print-header.tsx";

import { RelatedNewsSidebar } from "@/components/sections/related-news-sidebar.tsx";
import { RelatedNewsGrid } from "@/components/sections/related-news-grid.tsx";
import { CategorySuggestions } from "@/components/sections/category-suggestions.tsx";

import { NewsletterSubscription } from "@/components/widgets/newsletter-subscription.tsx";
import { TableOfContents } from "@/components/article/table-of-contents.tsx";
import {
  ReadingHistory,
  useTrackReading,
} from "@/components/widgets/reading-history.tsx";

import {useRSSFeeds} from "@/hooks/use-rss";
import {useArticle} from "@/hooks/use-article";
import {useViewCounter} from "@/hooks/use-view-counter";
import {useEffect, useState} from "react";
import type {Article} from "@/types/news";
import {authorInfo} from "@/constant/author";
import LoadingSpinner from "@/components/common/loading-spinner.tsx";
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
      const foundArticle = articles.find((a) => a.guid === slug);
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

  const localViewCount = useViewCounter(slug || "");

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
    <div className="bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-8 lg:grid-cols-12 xl:grid-cols-10">
          <div className="lg:col-span-9 xl:col-span-7">
            <div className="no-print">
              <Breadcrumbs items={breadcrumbs} />
            </div>

            <PrintHeader
              title={articleTitle}
              author={authorInfo.name}
              publishedAt={new Date(rssArticle.pubDate).toLocaleString("vi-VN")}
            />

            <article className="mt-4">
              <h1 className="text-pretty text-3xl font-extrabold leading-tight text-foreground lg:text-4xl">
                {articleTitle}
              </h1>

              <div className="no-print">
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
                  viewCount={localViewCount}
                />
              </div>

              <div className="my-6 border-l-4 border-primary bg-muted/30 py-4 pl-6 pr-4">
                <p className="text-pretty text-base font-semibold leading-relaxed text-foreground/90 lg:text-lg">
                  {articleSapo}
                </p>
              </div>
              <ArticleContent content={articleContent} />

              <div className="my-6 p-4 bg-muted/30 rounded">
                <p className="text-sm text-muted-foreground">
                  Nguồn:{" "}
                  <a
                    href={rssArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    24h.com.vn
                  </a>
                </p>
              </div>

              <div className="no-print">
                <AuthorProfileCard {...authorInfo} />

                <NewsletterSubscription />

                <ArticleDisclaimer />

                <ArticleTags tags={[rssArticle.category || "Tin tức"]} />

                <ArticleComments />
              </div>
            </article>
          </div>

          <aside className="lg:col-span-3 xl:col-span-3">
            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
              <TableOfContents content={articleContent} />

              <RelatedNewsSidebar category={rssArticle.category || "Tin tức"} />

              <ReadingHistory />
            </div>
          </aside>
        </div>

        <div className="no-print">
          <RelatedNewsGrid category={rssArticle.category || "Tin tức"} />

          <CategorySuggestions />
        </div>
      </div>
    </div>
  );
}
