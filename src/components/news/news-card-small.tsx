import { Link } from "react-router";
import { ImageWithFallback } from "@/components/common/image-with-fallback";
import { formatRelativeTime } from "@/lib/time";

interface NewsCardSmallProps {
  title: string;
  sapo?: string;
  image: string;
  href: string;
  publishedAt: string;
}

export function NewsCardSmall(props: NewsCardSmallProps) {

  const { title, sapo, image, href, publishedAt } = props;
  const time = formatRelativeTime(publishedAt);
  return (
    <Link to={href} className="group">
      <article className="flex gap-3 py-3 border-b border-border/50 last:border-0 transition-all hover:bg-accent/5">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-muted">
          <ImageWithFallback
            src={image}
            alt={title}
            className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {title}
          </h3>
          {sapo && (
            <p className="mb-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {sapo}
            </p>
          )}
          <time className="text-xs text-muted-foreground">
           {time}
           {time}
          </time>
        </div>
      </article>
    </Link>
  );
}
