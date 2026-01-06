import {
  Bookmark,
  Calendar,
  Check,
  Eye,
  Facebook,
  LinkIcon,
  MessageCircle,
  Printer,
  Share2,
  User,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { FontSizeAdjuster } from "@/components/widgets/font-size-adjuster.tsx";
import { useEffect, useState } from "react";

interface ArticleMetaProps {
  author: string;
  publishedAt: string;
  articleContent?: string;
  viewCount?: number;
  shareCount?: number;
}

export function ArticleMeta({
  author,
  publishedAt,
  articleContent,
  viewCount = 4532,
  shareCount = 342,
}: ArticleMetaProps) {
  
  const [isSaved, setIsSaved] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [localShareCount, setLocalShareCount] = useState(shareCount);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const bookmarks = localStorage.getItem("bookmarks");
      if (bookmarks) {
        const bookmarkList = JSON.parse(bookmarks);
        const currentUrl = window.location.pathname;
        setIsSaved(bookmarkList.some((b: any) => b.url === currentUrl));
      }
    }
  }, []);

  const handleTextToSpeech = () => {
    if (!articleContent) return;

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(articleContent);
    utterance.lang = "vi-VN";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onend = () => setIsReading(false);
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;

    setLocalShareCount((prev) => prev + 1);

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "zalo":
        window.open(
          `https://page.zalo.me/share?url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Đã sao chép link!");
        break;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveArticle = () => {
    if (typeof window === "undefined") return;

    const bookmarks = localStorage.getItem("bookmarks");
    const bookmarkList = bookmarks ? JSON.parse(bookmarks) : [];
    const currentUrl = window.location.pathname;
    const title = document.title;

    if (isSaved) {
      // Remove bookmark
      const filtered = bookmarkList.filter((b: any) => b.url !== currentUrl);
      localStorage.setItem("bookmarks", JSON.stringify(filtered));
      setIsSaved(false);
    } else {
      // Add bookmark
      const newBookmark = {
        url: currentUrl,
        title,
        savedAt: new Date().toISOString(),
      };
      bookmarkList.unshift(newBookmark);
      localStorage.setItem(
        "bookmarks",
        JSON.stringify(bookmarkList.slice(0, 50))
      );
      setIsSaved(true);
    }
  };

  return (
    <div className="mt-4 border-y border-border py-4">
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="font-medium text-foreground">{author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{publishedAt}</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span>{viewCount.toLocaleString()} lượt xem</span>
        </div>
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          <span>{localShareCount} lượt chia sẻ</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button
          variant={isSaved ? "default" : "outline"}
          size="sm"
          onClick={handleSaveArticle}
          className="gap-2"
        >
          {isSaved ? (
            <Check className="h-4 w-4" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
          {isSaved ? "Đã lưu" : "Lưu bài viết"}
        </Button>

        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <MessageCircle className="h-4 w-4" />
          Góp ý
        </Button>

        <Button
          variant={isReading ? "default" : "outline"}
          size="sm"
          onClick={handleTextToSpeech}
          className="gap-2"
        >
          <Volume2 className="h-4 w-4" />
          {isReading ? "Đang đọc..." : "Nghe bài viết"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          className="gap-2 bg-transparent"
        >
          <Printer className="h-4 w-4" />
          In bài
        </Button>

        <FontSizeAdjuster />

        <div className="h-6 w-px bg-border" />

        <span className="text-sm text-muted-foreground">Chia sẻ:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare("facebook")}
          className="gap-2"
        >
          <Facebook className="h-4 w-4" />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare("zalo")}
          className="gap-2"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
          </svg>
          Zalo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare("copy")}
          className="gap-2"
        >
          <LinkIcon className="h-4 w-4" />
          Copy
        </Button>
      </div>
    </div>
  );
}
