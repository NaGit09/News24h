import Link from "next/link"
import Image from "next/image"

interface NewsItem {
  title: string
  sapo?: string
  image: string
  href: string
  publishedAt: string
}

interface CategoryBlockProps {
  category: string
  subTags?: string[]
  featured: NewsItem
  gridItems: NewsItem[]
  listItems: { title: string; href: string; publishedAt: string }[]
}

export function CategoryBlock({ category, subTags, featured, gridItems, listItems }: CategoryBlockProps) {
  return (
    <section className="border-t border-border py-6 mt-8">
      <div className="mb-4 flex items-center justify-between border-b-2 border-primary pb-2">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground uppercase">{category}</h2>
          {subTags && (
            <div className="hidden md:flex items-center gap-3">
              {subTags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary uppercase"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link href={`/${category.toLowerCase()}`} className="text-sm font-bold text-primary hover:underline uppercase">
          Xem thêm →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link href={featured.href} className="group block">
            <article>
              <div className="relative aspect-[16/9] overflow-hidden mb-3">
                <Image
                  src={featured.image || "/placeholder.svg"}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mb-2 text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                {featured.title}
              </h3>
              {featured.sapo && (
                <p className="mb-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{featured.sapo}</p>
              )}
              <time className="text-xs text-muted-foreground">{featured.publishedAt}</time>
            </article>
          </Link>
        </div>

        <div className="space-y-0 lg:col-span-4">
          {gridItems.map((item, index) => (
            <Link key={index} href={item.href} className="group block">
              <article className="flex gap-3 py-3 border-b border-border/50 last:border-0 hover:bg-accent/5">
                <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-3">
                    {item.title}
                  </h4>
                  <time className="text-xs text-muted-foreground">{item.publishedAt}</time>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="lg:col-span-3 border-l border-border pl-4">
          <ul className="space-y-3">
            {listItems.map((item, index) => (
              <li key={index} className="flex gap-2 pb-3 border-b border-border/30 last:border-0">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <Link href={item.href} className="group flex-1">
                  <h4 className="text-xs font-semibold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-2">
                    {item.title}
                  </h4>
                  <time className="mt-1 block text-[10px] text-muted-foreground">{item.publishedAt}</time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
