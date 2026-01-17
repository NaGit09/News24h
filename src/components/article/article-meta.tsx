import {
  Calendar,
  Clock,
  Eye,
  Facebook,
  LinkIcon,
  MessageCircle,
  Printer,
  Share2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { FontSizeAdjuster } from "@/components/widgets/font-size-adjuster.tsx";
import { useMemo, useState } from "react";
import { calculateReadingTime, formatReadingTime } from "@/lib/time";
import { handlePrintArticle, navigateToComment } from "@/lib/helper";
import { toast } from "sonner";

interface ArticleMetaProps {
  author: string;
  publishedAt: string;
  articleContent?: string;
  viewCount?: number;
  shareCount?: number;
  ttsButton?: React.ReactNode;
  bookmarkButton?: React.ReactNode;
}

export function ArticleMeta({
  author,
  publishedAt,
  articleContent,
  viewCount = 4532,
  shareCount = 342,
  ttsButton,
  bookmarkButton,
}: ArticleMetaProps) {
  const [localShareCount, setLocalShareCount] = useState(shareCount);

  const readingTime = useMemo(() => {
    if (!articleContent) return 0;
    return calculateReadingTime(articleContent);
  }, [articleContent]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = document.title;

    setLocalShareCount((prev) => prev + 1);

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        );
        toast.success("Đang mở Facebook để chia sẻ");
        break;
      case "zalo":
        window.open(
          `https://page.zalo.me/share?url=${encodeURIComponent(url)}`,
          "_blank"
        );
        toast.success("Đang mở Zalo để chia sẻ");
        break;
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          toast.success("Đã sao chép link vào clipboard!");
        }).catch(() => {
          toast.error("Không thể sao chép link");
        });
        break;
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
        {readingTime > 0 && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{formatReadingTime(readingTime)}</span>
          </div>
        )}
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
        {/* TTS and Bookmark buttons */}
        {ttsButton}
        {bookmarkButton}

        <Button
          onClick={navigateToComment}
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent"
        >
          <MessageCircle className="h-4 w-4" />
          Góp ý
        </Button>

        {/* TTS button removed - now using ViettelTTSButton component */}

        <Button
          variant="outline"
          size="sm"
          onClick={handlePrintArticle}
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
