import {useEffect, useRef} from "react"

const liveNews = [
    "🔴 TRỰC TIẾP: Man United vs Arsenal - Trận cầu đỉnh cao Ngoại hạng Anh",
    "⚡ Giá vàng SJC tăng mạnh, vượt mốc 82 triệu đồng/lượng",
    "🏆 U23 Việt Nam thắng đậm 3-0 trước Malaysia tại SEA Games",
    "💰 Chứng khoán tăng điểm, VN-Index vượt mốc 1.200",
    "🌐 Hà Nội công bố quy hoạch 3 tuyến đường sắt đô thị mới",
    "🎯 Chính phủ công bố gói hỗ trợ 50 nghìn tỷ cho doanh nghiệp SME",
    "⚽ Quang Hải lập cú đúp giúp CLB thắng đậm ở AFC Champions League",
    "📱 Apple ra mắt iPhone 16 Pro với camera AI thế hệ mới",
    "🏥 Bộ Y tế triển khai chương trình tiêm vaccine miễn phí toàn quốc",
    "🌦️ Bão số 7 suy yếu thành áp thấp nhiệt đới, miền Trung hết cảnh báo",
    "🚗 VinFast mở rộng thị trường sang 5 nước châu Âu mới",
    "🎬 Phim Việt đạt doanh thu 200 tỷ trong tuần đầu công chiếu",
]

export function LiveNewsTicker() {
    const tickerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ticker = tickerRef.current
        if (!ticker) return

        let animationFrame: number
        let position = 0

        const animate = () => {
            position -= 1
            if (Math.abs(position) >= ticker.scrollWidth / 2) {
                position = 0
            }
            ticker.style.transform = `translateX(${position}px)`
            animationFrame = requestAnimationFrame(animate)
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [])

    return (
        <div className="bg-primary text-primary-foreground overflow-hidden relative">
            <div className="flex items-center h-9">
                <div
                    className="w-24 shrink-0 px-3 text-xs font-bold whitespace-nowrap flex items-center justify-center gap-1.5 bg-primary border-r border-primary-foreground/20">
                    <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse"/>
                    TIN MỚI
                </div>
                <div className="flex-1 overflow-hidden">
                    <div ref={tickerRef} className="flex gap-8 whitespace-nowrap">
                        {[...liveNews, ...liveNews].map((news, i) => (
                            <div key={i} className="text-sm font-medium flex items-center gap-2">
                                <span className="text-primary-foreground/40">•</span>
                                {news}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


