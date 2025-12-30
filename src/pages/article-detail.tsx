import {useParams} from "react-router"
import {Breadcrumbs} from "@/components/layout/breadcrumbs.tsx"
import {ArticleMeta} from "@/components/article/article-meta.tsx"
import {ArticleContent} from "@/components/article/article-content.tsx"
import {ArticleDisclaimer} from "@/components/article/article-disclaimer.tsx"
import {ArticleTags} from "@/components/article/article-tags.tsx"
import {RelatedNewsSidebar} from "@/components/sections/related-news-sidebar.tsx"
import {RelatedNewsGrid} from "@/components/sections/related-news-grid.tsx"
import {CategorySuggestions} from "@/components/sections/category-suggestions.tsx"
import {ArticleComments} from "@/components/article/article-comments.tsx"
import {AuthorProfileCard} from "@/components/article/author-profile-card.tsx"
import {NewsletterSubscription} from "@/components/widgets/newsletter-subscription.tsx"
import {TableOfContents} from "@/components/article/table-of-contents.tsx"
import {ReadingHistory, useTrackReading} from "@/components/widgets/reading-history.tsx"
import {useRSSFeeds} from "@/hooks/use-rss"
import {useArticle} from "@/hooks/use-article"
import {useEffect, useState} from "react"
import type {Article} from "@/types/news"

export default function ArticlePage() {
    const {slug} = useParams<{ slug: string }>()
    const {articles, loading: rssLoading} = useRSSFeeds()
    const [rssArticle, setRssArticle] = useState<Article | null>(null)

    useEffect(() => {
        if (articles.length > 0 && slug) {
            const foundArticle = articles.find(a => a.guid === slug)
            if (foundArticle) {
                setRssArticle(foundArticle)
            }
        }
    }, [articles, slug])

    const {article: fullArticle, loading: articleLoading, error: articleError} = useArticle(rssArticle?.link)

    useTrackReading({
        slug: slug || "",
        title: rssArticle?.title || "",
        category: rssArticle?.category || "",
    })

    const loading = rssLoading || articleLoading

    if (loading) {
        return (
            <div className="bg-background min-h-screen">
                <div className="container mx-auto px-4 py-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-muted rounded w-3/4"/>
                        <div className="h-4 bg-muted rounded w-1/4"/>
                        <div className="h-64 bg-muted rounded"/>
                    </div>
                </div>
            </div>
        )
    }

    if (articleError || !rssArticle) {
        return (
            <div className="bg-background min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-destructive mb-4">Không tìm thấy bài viết. Vui lòng thử lại sau.</p>
                    <a href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded inline-block">
                        Về trang chủ
                    </a>
                </div>
            </div>
        )
    }

    const breadcrumbs = [
        {label: "Trang chủ", href: "/"},
        {label: rssArticle.category || "Tin tức", href: `/danh-muc/${rssArticle.category?.toLowerCase().replace(/\s+/g, '-')}`},
    ]

    const authorInfo = {
        name: "Biên tập viên 24h",
        bio: "Đội ngũ biên tập viên chuyên nghiệp của 24h, cập nhật tin tức nhanh chóng và chính xác.",
        articleCount: 1000,
        email: "bientap@24h.com.vn",
    }

    const articleTitle = fullArticle?.title || rssArticle.title
    const articleSapo = fullArticle?.sapo || rssArticle.description.substring(0, 300)
    const articleContent = fullArticle?.content || `
    <p>${rssArticle.description}</p>
    ${rssArticle.image ? `<img src="${rssArticle.image}" alt="${rssArticle.title}" class="img-fluid rounded my-3" />` : ''}
  `

    const plainTextContent = articleContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-6">
                <div className="grid gap-8 lg:grid-cols-12 xl:grid-cols-10">
                    <div className="lg:col-span-9 xl:col-span-7">
                        <Breadcrumbs items={breadcrumbs}/>

                        <article className="mt-4">
                            <h1 className="text-pretty text-3xl font-extrabold leading-tight text-foreground lg:text-4xl">
                                {articleTitle}
                            </h1>

                            <ArticleMeta
                                author={authorInfo.name}
                                publishedAt={new Date(rssArticle.pubDate).toLocaleString('vi-VN', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                                articleContent={plainTextContent}
                            />

                            <div className="my-6 border-l-4 border-primary bg-muted/30 py-4 pl-6 pr-4">
                                <p className="text-pretty text-base font-semibold leading-relaxed text-foreground/90 lg:text-lg">
                                    {articleSapo}
                                </p>
                            </div>

                            <ArticleContent content={articleContent}/>

                            <div className="my-6 p-4 bg-muted/30 rounded">
                                <p className="text-sm text-muted-foreground">
                                    Nguồn:{" "}
                                    <a
                                        href={rssArticle.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline font-medium"
                                    >
                                        24h.com.vn
                                    </a>
                                </p>
                            </div>

                            <AuthorProfileCard {...authorInfo} />

                            <NewsletterSubscription/>

                            <ArticleDisclaimer/>

                            <ArticleTags tags={[rssArticle.category || "Tin tức"]}/>

                            <ArticleComments/>
                        </article>
                    </div>

                    <aside className="lg:col-span-3 xl:col-span-3">
                        <div className="sticky top-24 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
                            <TableOfContents content={articleContent}/>

                            <RelatedNewsSidebar category={rssArticle.category || "Tin tức"}/>

                            <ReadingHistory/>
                        </div>
                    </aside>
                </div>

                <RelatedNewsGrid category={rssArticle.category || "Tin tức"}/>

                <CategorySuggestions/>
            </div>
        </div>
    )
}


