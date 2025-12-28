import Image from "next/image"
import Link from "next/link"

interface NewsCardSmallProps {
  title: string
  image: string
  href: string
  publishedAt: string
}

export function NewsCardSmall({ title, image, href, publishedAt }: NewsCardSmallProps) {
  return (
    <Link href={href} className="group">
      <article className="flex gap-3 py-3 border-b border-border/50 last:border-0 transition-all hover:bg-accent/5">
        <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-3">
            {title}
          </h3>
          <time className="text-xs text-muted-foreground">{publishedAt}</time>
        </div>
      </article>
    </Link>
  )
}
