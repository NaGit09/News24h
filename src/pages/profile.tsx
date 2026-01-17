import { useState } from "react";
import { Link } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock, Trash2, ExternalLink, Filter } from "lucide-react";
import { useBookmark } from "@/hooks/use-bookmark";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/date-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ReadingHistoryArticle {
  slug: string;
  title: string;
  category: string;
  readAt: string;
}

export default function ProfilePage() {
  const { bookmarks, removeBookmark } = useBookmark();
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryArticle[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const history = localStorage.getItem("reading-history");
      return history ? JSON.parse(history) : [];
    } catch (err) {
      console.error("Error loading reading history:", err);
      return [];
    }
  });

  // Filter states
  const [bookmarkFilter, setBookmarkFilter] = useState<string>("all");
  const [bookmarkSort, setBookmarkSort] = useState<string>("newest");
  const [historyFilter, setHistoryFilter] = useState<string>("all");

  // Get unique categories - with safety checks
  const bookmarkCategories = Array.from(new Set(bookmarks.map(b => b.category).filter(Boolean)));
  const historyCategories = Array.from(new Set(readingHistory.map(h => h.category).filter(Boolean)));

  // Filter and sort bookmarks
  const filteredBookmarks = bookmarks
    .filter(b => bookmarkFilter === "all" || b.category === bookmarkFilter)
    .sort((a, b) => {
      if (bookmarkSort === "newest") {
        return new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime();
      } else {
        return new Date(a.bookmarkedAt).getTime() - new Date(b.bookmarkedAt).getTime();
      }
    });

  // Filter history - with safety checks
  const filteredHistory = readingHistory
    .filter(h => h && h.slug && h.title) // Filter out invalid items
    .filter(h => historyFilter === "all" || h.category === historyFilter);

  const clearReadingHistory = () => {
    localStorage.removeItem("reading-history");
    setReadingHistory([]);
  };

  const clearAllBookmarks = () => {
    localStorage.removeItem("bookmarks");
    window.location.reload();
  };

  // Check for data issues
  const hasInvalidHistory = readingHistory.some(h => !h || !h.slug || !h.title);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Trang cá nhân</h1>
          <p className="text-muted-foreground">
            Quản lý bài viết đã lưu và lịch sử đọc của bạn
          </p>
        </div>

        <Tabs defaultValue="bookmarks" className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="bookmarks" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Đã lưu ({bookmarks.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Lịch sử ({readingHistory.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookmarks" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredBookmarks.length === 0
                  ? "Chưa có bài viết nào được lưu"
                  : `${filteredBookmarks.length} bài viết${bookmarkFilter !== "all" ? ` (${bookmarkFilter})` : ""}`}
              </p>
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Category Filter */}
                <Select value={bookmarkFilter} onValueChange={setBookmarkFilter}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {bookmarkCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={bookmarkSort} onValueChange={setBookmarkSort}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="oldest">Cũ nhất</SelectItem>
                  </SelectContent>
                </Select>

                {bookmarks.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa tất cả
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa tất cả bài viết đã lưu? Hành động này không thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction onClick={clearAllBookmarks}>
                        Xóa tất cả
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              </div>
            </div>

            {filteredBookmarks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center mb-4">
                    {bookmarkFilter !== "all" 
                      ? `Không có bài viết nào trong danh mục "${bookmarkFilter}"`
                      : "Bạn chưa lưu bài viết nào"
                    }
                  </p>
                  {bookmarkFilter === "all" && (
                    <Button asChild>
                      <Link to="/">Khám phá tin tức</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                {filteredBookmarks.map((article) => (
                  <Card key={article.slug} className="group hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 space-y-2">
                          <Badge variant="secondary" className="text-xs">
                            {article.category || "Tin tức"}
                          </Badge>
                          <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                            <Link to={`/bai-viet/${article.slug}`} className="hover:underline">
                              {article.title}
                            </Link>
                          </CardTitle>
                          {article.description && (
                            <CardDescription className="line-clamp-2 text-sm">
                              {article.description}
                            </CardDescription>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBookmark(article.slug)}
                          title="Xóa khỏi danh sách lưu"
                          className="shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>
                            {formatDate(article.bookmarkedAt, {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }, "Chưa rõ")}
                          </span>
                        </div>
                        <Link
                          to={`/bai-viet/${article.slug}`}
                          className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
                        >
                          Đọc <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {hasInvalidHistory && (
              <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-sm">
                <p className="text-yellow-700 dark:text-yellow-400">
                  ⚠️ <strong>Cảnh báo:</strong> Phát hiện dữ liệu lịch sử không hợp lệ. 
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={clearReadingHistory}
                    className="ml-2 h-auto p-0 text-yellow-700 dark:text-yellow-400 underline"
                  >
                    Xóa lịch sử để khắc phục
                  </Button>
                </p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredHistory.length === 0
                  ? "Chưa có lịch sử đọc"
                  : `${filteredHistory.length} bài viết${historyFilter !== "all" ? ` (${historyFilter})` : ""}`}
              </p>
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Category Filter */}
                {historyCategories.length > 0 && (
                  <Select value={historyFilter} onValueChange={setHistoryFilter}>
                    <SelectTrigger className="w-[160px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      {historyCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {readingHistory.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa lịch sử
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa toàn bộ lịch sử đọc? Hành động này không thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction onClick={clearReadingHistory}>
                        Xóa lịch sử
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              </div>
            </div>

            {filteredHistory.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center mb-4">
                    {historyFilter !== "all"
                      ? `Không có lịch sử đọc trong danh mục "${historyFilter}"`
                      : "Chưa có lịch sử đọc"
                    }
                  </p>
                  {historyFilter === "all" && (
                    <Button asChild>
                      <Link to="/">Bắt đầu đọc tin</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredHistory.map((article, index) => (
                      <Link
                        key={`${article.slug}-${index}`}
                        to={`/bai-viet/${article.slug}`}
                        className="block p-4 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-sm text-muted-foreground mt-1 min-w-6">
                            {index + 1}.
                          </span>
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                              {article.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                {article.category}
                              </Badge>
                              <Separator orientation="vertical" className="h-3" />
                              <span>{article.readAt}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
