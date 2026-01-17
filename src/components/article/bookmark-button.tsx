import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useBookmark } from "@/hooks/use-bookmark";
import { toast } from "sonner";

interface BookmarkButtonProps {
  article: {
    slug: string;
    title: string;
    category: string;
    image?: string;
    description?: string;
  };
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
}

export const BookmarkButton = ({
  article,
  variant = "outline",
  size = "sm",
  showText = true,
}: BookmarkButtonProps) => {
  const { isBookmarked, toggleBookmark } = useBookmark();
  const bookmarked = isBookmarked(article.slug);

  const handleToggle = () => {
    // Validate slug before saving
    if (!article.slug || article.slug === "" || article.slug === "undefined") {
      toast.error("Không thể lưu bài viết: Thiếu thông tin");
      return;
    }

    toggleBookmark(article);
    if (bookmarked) {
      toast.success("Đã xóa khỏi danh sách lưu");
    } else {
      toast.success("Đã lưu bài viết");
    }
  };

  // Don't show button if slug is invalid
  if (!article.slug || article.slug === "" || article.slug === "undefined") {
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={bookmarked ? "text-primary" : ""}
      title={bookmarked ? "Bỏ lưu bài viết" : "Lưu bài viết"}
    >
      <Bookmark
        className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`}
      />
      {showText && (
        <span className="ml-2">
          {bookmarked ? "Đã lưu" : "Lưu bài"}
        </span>
      )}
    </Button>
  );
};
