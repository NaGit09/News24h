import {useEffect, useState} from "react"
import {Link} from "react-router"
import {AlertCircle, X} from "lucide-react"

interface BreakingNewsItem {
    title: string
    href: string
    time: string
}

export function BreakingNewsBanner() {
    const [isVisible, setIsVisible] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)

    const breakingNews: BreakingNewsItem[] = [
        {
            title: "Chính phủ công bố gói hỗ trợ kinh tế 50,000 tỷ đồng cho doanh nghiệp vừa và nhỏ",
            href: "/bai-viet/chinh-phu-ho-tro-kinh-te",
            time: "5 phút trước",
        },
        {
            title: "Bão số 8 đang tiến vào biển Đông, dự báo mạnh cấp 13-14 trong 24 giờ tới",
            href: "/bai-viet/bao-so-8-bien-dong",
            time: "12 phút trước",
        },
        {
            title: "VN-Index vượt mốc 1,350 điểm, đạt đỉnh cao nhất trong 5 năm qua",
            href: "/bai-viet/vn-index-dinh-cao",
            time: "18 phút trước",
        },
    ]

    useEffect(() => {
        if (!isVisible || breakingNews.length <= 1) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % breakingNews.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [isVisible, breakingNews.length])

    if (!isVisible) return null

    const currentNews = breakingNews[currentIndex]

    return (
        <div className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 py-2.5">
                    <div className="flex items-center gap-2 shrink-0">
                        <AlertCircle className="h-5 w-5 animate-pulse"/>
                        <span className="text-sm font-bold uppercase tracking-wider">TIN NÓNG</span>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <Link to={currentNews.href} className="block transition-opacity hover:opacity-80">
                            <div className="flex items-center gap-3">
                                <span className="font-semibold text-sm line-clamp-1">{currentNews.title}</span>
                                <span className="text-xs opacity-75 shrink-0">{currentNews.time}</span>
                            </div>
                        </Link>
                    </div>

                    {breakingNews.length > 1 && (
                        <div className="flex items-center gap-1 shrink-0">
                            {breakingNews.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-1.5 rounded-full transition-all ${
                                        index === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                                    }`}
                                    aria-label={`Xem tin ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => setIsVisible(false)}
                        className="shrink-0 rounded p-1 transition-colors hover:bg-white/20"
                        aria-label="Đóng"
                    >
                        <X className="h-4 w-4"/>
                    </button>
                </div>
            </div>
        </div>
    )
}


