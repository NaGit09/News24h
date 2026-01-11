import { useEffect } from "react";
import { Link } from "react-router";
import { Clock } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  category: string;
  readAt: string;
}

export function ReadingHistory() {
  const getHistory = (): Article[] => {
    if (typeof window === "undefined") return [];
    const history = localStorage.getItem("reading-history");
    return history ? JSON.parse(history) : [];
  };

  const history = getHistory().slice(0, 5);

  if (history.length === 0) return null;

  return (
    <div className="rounded-xl border border-border/50 bg-card shadow-sm p-4 mt-6">
      <div className="flex items-center gap-2 mb-4 border-b pb-2">
        <Clock className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
          Đã đọc gần đây
        </h3>
      </div>

      <div className="space-y-4">
        {history.map((article, index) => (
          <Link
            key={index}
            to={`/bai-viet/${article.slug}`}
            className="block group"
          >
            <div className="flex items-start gap-2">
              <span className="text-xs text-muted-foreground mt-1 min-w-5">
                {index + 1}.
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {article.category} • {article.readAt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Hook to track article reading
export function useTrackReading(article: {
  slug: string;
  title: string;
  category: string;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const history = localStorage.getItem("reading-history");
    const articles: Article[] = history ? JSON.parse(history) : [];

    // Remove if already exists
    const filtered = articles.filter((a) => a.slug !== article.slug);

    // Add to front
    const newHistory = [
      {
        ...article,
        readAt: new Date().toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
        }),
      },
      ...filtered,
    ].slice(0, 20); // Keep last 20 articles

    localStorage.setItem("reading-history", JSON.stringify(newHistory));
  }, [article]);
}
