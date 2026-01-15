import { NewsCardFeatured } from "@/components/news/news-card-featured.tsx";
import { NewsCardSmall } from "@/components/news/news-card-small.tsx";
import { NewsStack } from "@/components/news/news-stack.tsx";
import { useEffect, useState } from "react";
import VideoPlayer from "@/components/ui/video-player";

import { SportWidget } from "@/components/widgets/sport-widget.tsx";

import { BreakingNewsBanner } from "@/components/sections/breaking-news-banner.tsx";
import { CategoryBlock } from "@/components/sections/category-block.tsx";
import { SidebarTrending } from "@/components/sections/sidebar-trending.tsx";

import { useRSSFeeds } from "@/hooks/use-rss";
import LoadingSpinner from "@/components/common/loading-spinner.tsx";
import Reload from "@/components/common/reload.tsx";

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
    return <LoadingSpinner />;
  }

  if (error) {
    return <Reload />;
  }

  const {
    heroNews,
    smallNews,
    newsStackItems,
    trendingNews,
    footballNews,
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
                <VideoPlayer
                  options={{
                    autoplay: true,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    sources: [
                      {
                        src: "https://cdn.24h.com.vn/upload/1-2026/videoclip/2026-01-16/1768517573-racingsantander_barcelona_720p.m3u8",
                        type: "application/x-mpegURL",
                      },
                    ],
                  }}
                  className="rounded-lg overflow-hidden"
                />
              </div>
            </div>
            <SidebarTrending items={trendingNews} />
          </div>
        </div>

        {/* Football */}

        <CategoryBlock
          category="Bóng đá"
          subTags={[
            "Champions League",
            "Premier League",
            "La Liga",
            "Serie A",
            "Ligue 1",
          ]}
          featured={footballNews[0]}
          gridItems={footballNews}
        />

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
