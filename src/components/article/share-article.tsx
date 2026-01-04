import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareArticleProps {
  title: string;
  url: string;
}

export function ShareArticle({ title, url }: ShareArticleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="flex items-center gap-2 my-6">
      <Button
        onClick={handleShare}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Share2 className="h-4 w-4" />
        Chia sẻ
      </Button>

      <Button
        onClick={handleCopyLink}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-600" />
            Đã copy
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy link
          </>
        )}
      </Button>
    </div>
  );
}
