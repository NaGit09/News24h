import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { NewsPreview } from "../news/news-preview.tsx";
import { homeCategoryBlocks } from "@/constant/home-data.ts";

export function CategorySuggestions() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const getSlug = (href: string) => {
    if (href.startsWith("http")) {
      const match = href.match(/\/([^\/]+)\.html$/);
      if (match) return match[1];
      const parts = href.split("/");
      return parts[parts.length - 1].replace(".html", "");
    }
    return href.replace("/bai-viet/", "");
  };

  const toSlug = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/\s+/g, "-");

  const randomCategories = useMemo(() => {
    return homeCategoryBlocks
      .map((block) => {
        const categorySlug = toSlug(block.category);
        const allArticles = [
          block.featured,
          ...block.gridItems,
          ...block.bulletList,
        ];

        const shuffled = [...allArticles].sort(() => 0.5 - Math.random());

        const mappedArticles = shuffled.map((item) => ({
          title: item.title,
          slug: getSlug(item.href),
          thumbnail: "image" in item ? (item.image as string) : undefined,
          publishedAt: item.publishedAt,
          sapo: "sapo" in item ? (item.sapo as string) : undefined,
        }));

        return {
          title: block.category,
          slug: categorySlug,
          articles: mappedArticles,
        };
      })
      .slice(0, 3);
  }, []);

  return (
    <div className="my-12 border-t-2 border-border pt-8">
      <h2 className="mb-8 text-2xl font-bold uppercase tracking-wider text-foreground">
        Đừng bỏ lỡ
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {randomCategories.map((category) => {
          const isExpanded = expandedCategories.includes(category.slug);
          const displayedArticles = isExpanded
            ? category.articles
            : category.articles.slice(0, 3);

          return (
            <div
              key={category.slug}
              className="border-b border-border pb-6 md:border-b-0"
            >
              <div className="mb-4 border-b-2 border-primary pb-2">
                <Link
                  to={`/danh-muc/${category.slug}`}
                  className="inline-block text-lg font-bold text-foreground transition-colors hover:text-primary"
                >
                  {category.title}
                </Link>
              </div>

              {/* Articles List */}
              <div className="space-y-4">
                {displayedArticles.map((article, idx) => (
                  <NewsPreview
                    key={`${article.slug}-${idx}`}
                    article={article}
                  />
                ))}
              </div>

              {/* View More Button */}
              {category.articles.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCategory(category.slug)}
                  className="mt-3 w-full gap-1 text-primary hover:bg-primary/10 hover:text-primary"
                >
                  {isExpanded ? "Thu gọn" : "Xem thêm"}
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
