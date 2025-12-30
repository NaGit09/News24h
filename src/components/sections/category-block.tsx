import {Link} from "react-router"
import {useState} from "react"

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
    bulletList?: { title: string; href: string; publishedAt: string }[]
}

function FeaturedArticle({item}: { item: NewsItem }) {
    const [imgError, setImgError] = useState(false)

    return (
        <Link to={item.href} className="group block">
            <article>
                <div className="relative aspect-video overflow-hidden mb-3 bg-muted">
                    <img
                        src={imgError ? "/placeholder.svg" : item.image}
                        alt={item.title}
                        className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
                        onError={() => setImgError(true)}
                    />
                </div>
                <h3 className="mb-2 text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                </h3>
                {item.sapo && (
                    <p className="mb-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{item.sapo}</p>
                )}
                <time className="text-xs text-muted-foreground">{item.publishedAt}</time>
            </article>
        </Link>
    )
}

function GridArticle({item}: { item: NewsItem }) {
    const [imgError, setImgError] = useState(false)

    return (
        <Link to={item.href} className="group block">
            <article className="flex gap-3 py-3 border-b border-border/50 last:border-0 hover:bg-accent/5">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-muted">
                    <img
                        src={imgError ? "/placeholder.svg" : item.image}
                        alt={item.title}
                        className="object-cover w-full h-full"
                        onError={() => setImgError(true)}
                    />
                </div>
                <div className="flex-1">
                    <h4 className="mb-1 text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-3">
                        {item.title}
                    </h4>
                    {item.sapo && (
                        <p className="mb-1 text-xs leading-relaxed text-muted-foreground line-clamp-1">{item.sapo}</p>
                    )}
                    <time className="text-xs text-muted-foreground">{item.publishedAt}</time>
                </div>
            </article>
        </Link>
    )
}

export function CategoryBlock({category, subTags, featured, gridItems, bulletList = []}: CategoryBlockProps) {
    return (
        <section className="border-t border-border py-4 mt-4">
            <div className="mb-3 flex items-center justify-between border-b-2 border-primary pb-2">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground uppercase">{category}</h2>
                    {subTags && (
                        <div className="hidden md:flex items-center gap-3">
                            {subTags.map((tag, index) => (
                                <Link
                                    key={index}
                                    to={`/tu-khoa/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary uppercase"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                <Link to={`/danh-muc/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm font-bold text-primary hover:underline uppercase">
                    Xem thêm →
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <FeaturedArticle item={featured}/>
                </div>

                <div className="space-y-0 lg:col-span-4">
                    {gridItems.map((item, index) => (
                        <GridArticle key={index} item={item}/>
                    ))}
                </div>

                <div className="lg:col-span-3 border-l border-border pl-4">
                    <ul className="space-y-3">
                        {bulletList.map((item, index) => (
                            <li key={index} className="flex gap-2 pb-3 border-b border-border/30 last:border-0">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"/>
                                <Link to={item.href} className="group flex-1">
                                    <h4 className="text-xs font-semibold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-2">
                                        {item.title}
                                    </h4>
                                    <time
                                        className="mt-1 block text-[10px] text-muted-foreground">{item.publishedAt}</time>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}


