import {Link} from "react-router"
import {Clock, Eye, User} from "lucide-react"

interface NewsPreviewProps {
    article: {
        title: string
        slug: string
        thumbnail?: string
        publishedAt: string
        sapo?: string
        contentPreview?: string
        views?: number
        readTime?: number
        author?: string
    }
    className?: string
}

export function NewsPreview({article, className = ""}: NewsPreviewProps) {
    const enhancedArticle = {
        ...article,
        contentPreview:
            article.contentPreview ||
            "Trong bối cảnh thị trường vàng thế giới biến động mạnh, giá vàng trong nước đã tăng vọt lên mức kỷ lục mới. Các chuyên gia nhận định đây là thời điểm tốt để nhà đầu tư cân nhắc chiến lược đầu tư dài hạn. Theo số liệu từ Hiệp hội Vàng Thế giới, nhu cầu mua vàng tại Việt Nam đã tăng 35% so với cùng kỳ năm ngoái.",
        views: article.views || Math.floor(Math.random() * 10000) + 1000,
        readTime: article.readTime || Math.floor(Math.random() * 5) + 3,
        author: article.author || "Nguyễn Văn A",
    }

    return (
        <div className={`group relative ${className}`}>
            <Link to={`/bai-viet/${article.slug}`} className="flex gap-3 border-b border-border pb-3 last:border-0">
                {article.thumbnail && (
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden">
                        <img
                            src={article.thumbnail || "/placeholder.svg"}
                            alt={article.title}
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                )}
                <div className="min-w-0 flex-1">
                    <h3 className="relative inline-block text-sm font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                        <span className="line-clamp-2">{article.title}</span>
                        <span
                            className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"/>
                    </h3>
                    {article.sapo && (
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{article.sapo}</p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">{article.publishedAt}</p>
                </div>
            </Link>

            <div
                className="pointer-events-none absolute left-0 top-full z-50 mt-2 hidden w-full max-w-md rounded border border-border bg-background p-4 shadow-2xl group-hover:block">
                <div className="flex gap-3">
                    {article.thumbnail && (
                        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded">
                            <img src={article.thumbnail || "/placeholder.svg"} alt={article.title}
                                 className="object-cover"/>
                        </div>
                    )}
                    <div className="flex-1">
                        <h4 className="mb-2 line-clamp-2 text-sm font-bold text-foreground">{article.title}</h4>
                        <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <User className="h-3 w-3"/>
                                <span>{enhancedArticle.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3"/>
                                <span>{enhancedArticle.readTime} phút</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3"/>
                                <span>{enhancedArticle.views.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {enhancedArticle.contentPreview}
                </p>
                <p className="mt-2 text-xs font-semibold text-primary">Nhấn để đọc toàn bộ →</p>
            </div>
        </div>
    )
}


