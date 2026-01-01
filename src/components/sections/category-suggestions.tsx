import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { NewsPreview } from "../news/news-preview.tsx";
import { categoriesSuggestions } from "@/constant/categories.ts";

export function CategorySuggestions() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  return (
    <div className="my-12 border-t-2 border-border pt-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categoriesSuggestions.map((category) => {
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
              <div className="space-y-3">
                {displayedArticles.map((article) => (
                  <NewsPreview key={article.slug} article={article} />
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
