import { relatedNews } from "@/constant/news.ts"
import {NewsPreview} from "../news/news-preview.tsx"

interface RelatedNewsGridProps {
    category: string
}

export function RelatedNewsGrid({category}: RelatedNewsGridProps) {


    return (
        <div className="mt-12 border-t-2 border-primary pt-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
                Tin cùng chuyên mục: <span className="text-primary">{category}</span>
            </h2>
            <div className="space-y-0">
                {relatedNews.map((news, index) => (
                    <article key={index} className="py-4 first:pt-0 last:border-0">
                        <NewsPreview
                            article={{
                                title: news.title,
                                slug: news.href.replace("/bai-viet/", ""),
                                thumbnail: news.image,
                                publishedAt: news.publishedAt,
                                sapo: news.sapo,
                            }}
                        />
                    </article>
                ))}
            </div>
        </div>
    )
}


