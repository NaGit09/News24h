import { NewsCardFeatured } from "@/components/news/news-card-featured.tsx";
import { NewsCardSmall } from "@/components/news/news-card-small.tsx";
import { NewsStack } from "@/components/news/news-stack.tsx";
import { useState, useEffect } from "react";

import { SportWidget } from "@/components/widgets/sport-widget.tsx";

import { CategoryBlock } from "@/components/sections/category-block.tsx";
import { SidebarTrending } from "@/components/sections/sidebar-trending.tsx";
import { BreakingNewsBanner } from "@/components/sections/breaking-news-banner.tsx";

import { useRSSFeeds } from "@/hooks/use-rss";
import Loading from "@/components/common/Loading";
import Reload from "@/components/common/Reload";

import { dataSample } from "@/lib/news";

export default function HomePage() {
  const { articles, loading: rssLoading, error } = useRSSFeeds();
  const [minimumLoading, setMinimumLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const loading = rssLoading || minimumLoading;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Reload />;
  }

  // Transform RSS articles to component props
  const {
    heroNews,
    smallNews,
    newsStackItems,
    trendingNews,
    homeCategoryBlocks,
  } = dataSample(articles);

  return (
    <div className="bg-background">
      <BreakingNewsBanner />

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4 lg:grid-cols-12 mb-6 pb-6 border-b border-border">
          <div className="lg:col-span-6 space-y-3">
            <NewsCardFeatured {...heroNews} />
            <div className="space-y-0 border-t border-border pt-3">
              {smallNews.map((news, index) => (
                <NewsCardSmall key={index} {...news} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <NewsStack items={newsStackItems} />
          </div>

          <div className="lg:col-span-3 space-y-3">
            <SportWidget />
            <div className="border border-border overflow-hidden">
              <h4 className="border-b-2 border-primary bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
                Video nổi bật
              </h4>
              <div className="aspect-video overflow-hidden">
                <img
                  src="/news-video-thumbnail.png"
                  alt="Video"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <SidebarTrending items={trendingNews} />
          </div>
        </div>

        {homeCategoryBlocks.map((block, index) => (
          <CategoryBlock
            key={index}
            category={block.category}
            subTags={block.subTags}
            featured={block.featured}
            gridItems={block.gridItems}
            bulletList={block.bulletList}
          />
        ))}
      </div>
    </div>
  );
}
