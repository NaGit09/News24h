import { RelationGoldPriceWithNews } from "@/constant/gold";
import { Card, CardContent } from "@/components/ui/card";

export function GoldNewsList() {
  if (!RelationGoldPriceWithNews || RelationGoldPriceWithNews.length === 0) {
    return null;
  }

  const [firstNews, ...otherNews] = RelationGoldPriceWithNews;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Thông tin liên quan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Featured News (First Card) */}
        <div className="md:col-span-2">
          <a href={`/bai-viet${firstNews.link}`} className="group block h-full">
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-sm bg-background">
              <CardContent className="p-0 h-full flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/3 h-64 md:h-auto relative overflow-hidden">
                  <img
                    src={firstNews.thumbnail}
                    alt={firstNews.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 p-4 md:py-6 md:pr-6 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-3">
                    {firstNews.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-4 md:line-clamp-5 mb-3">
                    {firstNews.content}
                  </p>
                  <span className="text-xs text-muted-foreground font-medium mt-auto">
                    {firstNews.source}
                  </span>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>

        {/* Other News List */}
        <div className="md:col-span-1 flex flex-col gap-4">
          {otherNews.slice(0, 4).map((news, index) => (
            <a key={index} href={news.link} className="group block">
              <Card className="overflow-hidden hover:shadow-md transition-shadow border-0 shadow-sm bg-background">
                <CardContent className="p-0 flex gap-3">
                  <div className="w-24 h-24 shrink-0 overflow-hidden">
                    <img
                      src={news.thumbnail}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 py-2 pr-2 flex flex-col justify-between">
                    <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {news.content}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* Remaining News Grid (if any) */}
      {otherNews.length > 4 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {otherNews.slice(4).map((news, index) => (
            <a key={index + 4} href={news.link} className="group block">
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow border-0 shadow-sm bg-background">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="w-full h-40 overflow-hidden">
                    <img
                      src={news.thumbnail}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <h4 className="text-sm font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2 flex-1">
                      {news.content}
                    </p>
                    <span className="text-xs text-muted-foreground mt-auto">
                      {news.source}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
