import Image from "next/image"
import Link from "next/link"

interface NewsCardFeaturedProps {
  title: string
  sapo: string
  image: string
  category: string
  href: string
  publishedAt: string
}

export function NewsCardFeatured({ title, sapo, image, category, href, publishedAt }: NewsCardFeaturedProps) {
  return (
    <Link href={href} className="group block">
      <article className="transition-all">
        <div className="relative aspect-[16/9] overflow-hidden mb-3">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-0 top-0 bg-primary px-3 py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground">{category}</span>
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
            {title}
          </h2>
          <p className="mb-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{sapo}</p>
          <time className="text-xs text-muted-foreground">{publishedAt}</time>
        </div>
      </article>
    </Link>
  )
}
