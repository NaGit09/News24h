import { Card, CardContent } from "@/components/ui/card";
import type { Article } from "@/types/news";

interface StockNewsListProps {
  articles: Article[];
}

export function StockNewsList({ articles }: StockNewsListProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const [firstNews, ...otherNews] = articles;

  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Thông tin thị trường & Tin tức
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Featured News (First Card) - Spans 8 cols */}
        <div className="md:col-span-8">
          <a
            href={firstNews.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full"
          >
            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white rounded-2xl flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img
                  src={firstNews.image}
                  alt={firstNews.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400?text=News"; // Placeholder
                    (e.target as HTMLImageElement).onerror = null;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              </div>
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white relative">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full w-fit">
                  Tiêu điểm
                </span>
                <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors line-clamp-3 leading-snug text-gray-900">
                  {firstNews.title}
                </h3>
                <div
                  className="text-gray-500 text-sm line-clamp-3 md:line-clamp-4 mb-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: firstNews.description }}
                />
                <div className="mt-auto flex items-center text-xs text-gray-400 font-medium pt-4 border-t border-gray-100">
                  <span>
                    {new Date(firstNews.pubDate).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Card>
          </a>
        </div>

        {/* Side News List - Spans 4 cols */}
        <div className="md:col-span-4 flex flex-col gap-4">
          {otherNews.slice(0, 3).map((news, index) => (
            <a
              key={index}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block flex-1"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white rounded-xl h-full">
                <CardContent className="p-0 flex gap-4 h-full">
                  <div className="w-24 min-w-[6rem] h-full relative overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 absolute inset-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/100x100?text=News";
                        (e.target as HTMLImageElement).onerror = null;
                      }}
                    />
                  </div>
                  <div className="flex-1 py-3 pr-4 flex flex-col justify-center">
                    <h4 className="text-sm font-bold line-clamp-2 group-hover:text-blue-600 transition-colors text-gray-800 leading-snug mb-2">
                      {news.title}
                    </h4>
                    <span className="text-xs text-gray-400 block">
                      {new Date(news.pubDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* More News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {otherNews.slice(3, 7).map((news, index) => (
          <a
            key={index + 3}
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full"
          >
            <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white rounded-xl flex flex-col">
              <div className="aspect-video w-full overflow-hidden relative">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/300x200?text=News";
                    (e.target as HTMLImageElement).onerror = null;
                  }}
                />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
                  Tài chính
                </div>
              </div>
              <CardContent className="p-4 flex flex-col flex-1">
                <h4 className="text-sm font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-gray-800 mt-1">
                  {news.title}
                </h4>
                <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    {new Date(news.pubDate).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
