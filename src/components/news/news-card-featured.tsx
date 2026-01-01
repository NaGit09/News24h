import { Link } from "react-router";
import { useState } from "react";

interface NewsCardFeaturedProps {
  title: string;
  sapo: string;
  image: string;
  category: string;
  href: string;
  publishedAt: string;
}

export function NewsCardFeatured({
  title,
  sapo,
  image,
  href,
  publishedAt,
}: NewsCardFeaturedProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={href} className="group block">
      <article className="transition-all">
        <div className="relative aspect-video overflow-hidden mb-2 bg-muted">
          <img
            src={imgError ? "/placeholder.svg" : image}
            alt={title}
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
            onError={() => setImgError(true)}
          />
        </div>
        <div>
          <h2 className="mb-1.5 text-lg font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
            {title}
          </h2>
          <p className="mb-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {sapo}
          </p>
          <time className="text-xs text-muted-foreground">{publishedAt}</time>
        </div>
      </article>
    </Link>
  );
}
