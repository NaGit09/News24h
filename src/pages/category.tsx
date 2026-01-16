import { useParams } from "react-router";
import { Link } from "react-router";

import { NewsCardSmall } from "@/components/news/news-card-small.tsx";
import { CategoryFilterTabs } from "@/components/common/category-filter-tabs.tsx";
import { Breadcrumbs } from "@/components/layout/breadcrumbs.tsx";
import { useState, useEffect, useRef } from "react";
import { useRSSByCategory } from "@/hooks/use-rss";
import { getCategoryName } from "@/constant/categories";
import LoadingSpinner from "@/components/common/loading-spinner.tsx";
import NotFound from "./not-found";
import Reload from "@/components/common/reload.tsx";
import { Clock } from "lucide-react";
import {formatRelativeTime } from "@/lib/time";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  const [displayedNews, setDisplayedNews] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const categoryName = getCategoryName(category || "") || "";

  const {
    articles,
    loading: rssLoading,
    error,
  } = useRSSByCategory(categoryName);
  const [minimumLoading, setMinimumLoading] = useState(true);

  useEffect(() => {
    setMinimumLoading(true);
    const timer = setTimeout(() => {
      setMinimumLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [category]);

  const loading = rssLoading || minimumLoading;

  useEffect(() => {
    if (articles.length > 0) {
      setDisplayedNews(articles);
      setHasMore(false);
    }
  }, [articles]);

  if (!categoryName) {
    return <NotFound />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Reload />;
  }

  const heroArticle = displayedNews[0];
  const subHeroArticles = displayedNews.slice(1, 4);
  const gridArticles = displayedNews.slice(4);

 

  return (
    <div className="bg-background min-h-screen pb-12">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs
          items={[
            { label: "Trang chủ", href: "/" },
            { label: categoryName, href: `/danh-muc/${category}` },
          ]}
        />

        {/* Header */}
        <div className="mb-8 border-b border-border/60 pb-6">
          <h1 className="text-4xl font-black tracking-tight text-foreground uppercase">
            {categoryName}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Tin tức nổi bật, cập nhật liên tục về {categoryName.toLowerCase()}
          </p>
        </div>

        <div className="mb-10">
          <CategoryFilterTabs onFilterChange={() => {}} />
        </div>

        {/* HERO SECTION */}
        {heroArticle && (
          <section className="mb-12 grid gap-8 lg:grid-cols-12">
            {/* Main Hero Article (Left - 8 cols) */}
            <div className="lg:col-span-8 group cursor-pointer">
              <Link
                to={`/bai-viet/${heroArticle.guid}`}
                className="block h-full"
              >
                <div className="relative overflow-hidden rounded-xl shadow-sm aspect-video mb-4">
                  <img
                    src={heroArticle.image || "/placeholder.svg"}
                    alt={heroArticle.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                    {heroArticle.title}
                  </h2>
                  <p className="text-lg text-muted-foreground line-clamp-3">
                    {heroArticle.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{formatRelativeTime(heroArticle.pubDate)}</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Side List (Right - 4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6 border-l border-border/50 pl-0 lg:pl-6">
              {subHeroArticles.map((article) => (
                <Link
                  key={article.guid}
                  to={`/bai-viet/${article.guid}`}
                  className="group flex gap-4 lg:block"
                >
                  <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg bg-muted lg:h-40 lg:w-full lg:mb-3">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="line-clamp-3 text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatRelativeTime(article.pubDate)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* REMAINING GRID SECTION */}
        <section>
          <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-2">
            <h3 className="text-2xl font-bold text-foreground">Tin khác</h3>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gridArticles.map((article) => (
              <NewsCardSmall
                key={article.guid}
                title={article.title}
                sapo={article.description}
                image={article.image || "/placeholder.svg"}
                href={`/bai-viet/${article.guid}`}
                publishedAt={formatRelativeTime(article.pubDate)}
              />
            ))}
          </div>

          <div ref={observerRef} className="mt-12 text-center">
            {hasMore ? (
              <LoadingSpinner />
            ) : (
              <div className="py-8 text-muted-foreground bg-muted/30 rounded-lg">
                <p>Đã hiển thị tất cả tin hiện có</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
