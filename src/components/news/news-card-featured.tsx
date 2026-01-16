import { Link } from "react-router";
import { ImageWithFallback } from "@/components/common/image-with-fallback";
import { formatRelativeTime } from "@/lib/time";

interface NewsCardFeaturedProps {
  title: string;
  sapo: string;
  image: string;
  category: string;
  href: string;
  publishedAt: string;
  timestamp?: string;
}

export function NewsCardFeatured({
  title,
  sapo,
  image,
  href,
  publishedAt,
}: NewsCardFeaturedProps) {
  return (
    <Link to={href} className="group block">
      <article className="transition-all">
        <div className="relative aspect-video overflow-hidden mb-2 bg-muted">
          <ImageWithFallback
            src={image}
            alt={title}
            className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
          />
        </div>
        <div>
          <h2 className="mb-1.5 text-lg font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
            {title}
          </h2>
          <p className="mb-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {sapo}
          </p>
          <time className="text-xs text-muted-foreground">
            bài viết được đăng tải vào lúc {formatRelativeTime(publishedAt)}
          </time>
        </div>
      </article>
    </Link>
  );
}
