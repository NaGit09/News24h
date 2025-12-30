import { useParams } from "react-router"
import { NewsCardFeatured } from "@/components/news/news-card-featured.tsx"
import { NewsCardSmall } from "@/components/news/news-card-small.tsx"
import { SkeletonNewsCardSmall } from "@/components/news/skeleton-news-card.tsx"
import { CategoryFilterTabs } from "@/components/common/category-filter-tabs.tsx"
import { Breadcrumbs } from "@/components/layout/breadcrumbs.tsx"
import { useState, useEffect, useRef } from "react"
import { useRSSByCategory } from "@/hooks/use-rss"
import { getCategoryName } from "@/lib/category-utils"

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const [filter, setFilter] = useState<"latest" | "popular" | "commented">("latest")
  const [page, setPage] = useState(1)
  const [displayedNews, setDisplayedNews] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement>(null)

  const categoryName = getCategoryName(category || "") || ""
  
  // If category not found, show error
  if (!categoryName) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-destructive mb-4">Không tìm thấy chuyên mục này.</p>
          <a href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded inline-block">
            Về trang chủ
          </a>
        </div>
      </div>
    )
  }
  
  const { articles, loading, error } = useRSSByCategory(categoryName)

  useEffect(() => {
    if (articles.length > 0) {
      setDisplayedNews(articles.slice(0, 10))
      setPage(1)
      setHasMore(articles.length > 10)
    }
  }, [articles])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading, page])

  const loadMore = () => {
    const nextNews = articles.slice(page * 10, (page + 1) * 10)
    if (nextNews.length > 0) {
      setDisplayedNews((prev) => [...prev, ...nextNews])
      setPage((prev) => prev + 1)
    } else {
      setHasMore(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse bg-muted h-8 w-64 mb-6 rounded" />
          <div className="animate-pulse bg-muted h-64 mb-8 rounded" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <SkeletonNewsCardSmall key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Không thể tải tin tức. Vui lòng thử lại sau.</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-primary-foreground rounded">
            Tải lại
          </button>
        </div>
      </div>
    )
  }

  const featuredNews = articles[0] ? {
    id: articles[0].guid,
    title: articles[0].title,
    sapo: articles[0].description.substring(0, 200) + '...',
    image: articles[0].image || "/placeholder.svg",
    category: categoryName,
    time: new Date(articles[0].pubDate).toLocaleString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    }),
    href: `/bai-viet/${articles[0].guid}`,
  } : null

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs
          items={[
            { label: "Trang chủ", href: "/" },
            { label: categoryName, href: `/danh-muc/${category}` },
          ]}
        />

        {/* Category Header with visual indicator */}
        <div className="mb-6 border-b-2 border-primary pb-4">
          <h1 className="text-3xl font-bold text-foreground">{categoryName}</h1>
          <p className="mt-2 text-muted-foreground">Cập nhật tin tức mới nhất về {categoryName.toLowerCase()}</p>
        </div>

        <div className="mb-8">
          <CategoryFilterTabs onFilterChange={setFilter} />
        </div>

        {/* Featured News */}
        {featuredNews && (
          <div className="mb-8">
            <NewsCardFeatured {...featuredNews} />
          </div>
        )}

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedNews.slice(1).map((article) => (
            <NewsCardSmall 
              key={article.guid}
              title={article.title}
              sapo={article.description.substring(0, 150) + '...'}
              image={article.image || "/placeholder.svg"}
              href={`/bai-viet/${article.guid}`}
              publishedAt={new Date(article.pubDate).toLocaleString('vi-VN', { 
                hour: '2-digit', 
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit'
              })}
            />
          ))}
        </div>

        <div ref={observerRef} className="mt-8 text-center">
          {hasMore && !loading && <p className="text-muted-foreground text-sm">Cuộn xuống để xem thêm...</p>}
          {!hasMore && <p className="text-muted-foreground text-sm">Đã hiển thị tất cả tin tức</p>}
        </div>
      </div>
    </div>
  )
}


