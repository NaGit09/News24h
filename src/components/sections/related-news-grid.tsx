import { homeCategoryBlocks } from "@/constant/home-data.ts";
import { NewsPreview } from "../news/news-preview.tsx";

interface RelatedNewsGridProps {
  category: string;
}

export function RelatedNewsGrid({ category }: RelatedNewsGridProps) {
  const categoryBlock =
    homeCategoryBlocks.find(
      (block) => block.category.toLowerCase() === category.toLowerCase()
    ) || homeCategoryBlocks.find((block) => block.category === "Tin tức");

  if (!categoryBlock) return null;

  const newsItems = [categoryBlock.featured, ...categoryBlock.gridItems];

  const getSlug = (href: string) => {
    if (href.startsWith("http")) {
      const match = href.match(/\/([^\/]+)\.html$/);
      if (match) return match[1];
        const parts = href.split("/");
      return parts[parts.length - 1].replace(".html", "");
    }
    return href.replace("/bai-viet/", "");
  };

  return (
    <div className="mt-12 border-t-2 border-primary pt-8">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Tin cùng chuyên mục:{" "}
        <span className="text-primary">{categoryBlock.category}</span>
      </h2>
      <div className="space-y-0">
        {newsItems.map((news, index) => (
          <article key={index} className="py-4 first:pt-0 last:border-0">
            <NewsPreview
              article={{
                title: news.title,
                slug: getSlug(news.href),
                thumbnail: news.image,
                publishedAt: news.publishedAt,
                sapo: news.sapo,
              }}
            />
          </article>
        ))}
      </div>
    </div>
  );
}
