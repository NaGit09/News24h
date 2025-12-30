import {ChevronRight} from "lucide-react"
import {Link} from "react-router"
import {useState} from "react"
import {Button} from "@/components/ui/button.tsx"
import {NewsPreview} from "../news/news-preview.tsx"

interface CategorySection {
    title: string
    slug: string
    articles: {
        title: string
        slug: string
        thumbnail?: string
        publishedAt: string
        sapo?: string
    }[]
}

export function CategorySuggestions() {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([])

    const categories: CategorySection[] = [
        {
            title: "Thời sự",
            slug: "thoi-su",
            articles: [
                {
                    title: "Thủ tướng chủ trì họp Chính phủ thường kỳ tháng 12",
                    slug: "thu-tuong-chu-tri-hop-chinh-phu",
                    thumbnail: "/government-meeting.png",
                    publishedAt: "2 giờ trước",
                    sapo: "Cuộc họp tập trung đánh giá tình hình kinh tế - xã hội và triển khai nhiệm vụ trọng tâm quý I/2025.",
                },
                {
                    title: "Bộ Công an thông tin về vụ án tại Tập đoàn FLC",
                    slug: "bo-cong-an-thong-tin-ve-vu-an-flc",
                    thumbnail: "/police-announcement.jpg",
                    publishedAt: "3 giờ trước",
                    sapo: "Cơ quan điều tra đã khởi tố thêm 5 bị can liên quan đến sai phạm tại Tập đoàn FLC.",
                },
                {
                    title: "Quốc hội thông qua Luật Đất đai sửa đổi",
                    slug: "quoc-hoi-thong-qua-luat-dat-dai",
                    thumbnail: "/government-meeting.png",
                    publishedAt: "4 giờ trước",
                    sapo: "Luật có nhiều điểm mới về quyền sử dụng đất, chuyển nhượng và bồi thường giải phóng mặt bằng.",
                },
                {
                    title: "Chính phủ ban hành Nghị định mới về đầu tư công",
                    slug: "chinh-phu-ban-hanh-nghi-dinh-dau-tu-cong",
                    thumbnail: "/police-announcement.jpg",
                    publishedAt: "5 giờ trước",
                    sapo: "Nghị định quy định chi tiết về quy trình phê duyệt và giải ngân vốn đầu tư công.",
                },
                {
                    title: "Bộ Tài chính đề xuất giảm thuế thu nhập doanh nghiệp",
                    slug: "bo-tai-chinh-de-xuat-giam-thue",
                    thumbnail: "/government-meeting.png",
                    publishedAt: "6 giờ trước",
                    sapo: "Đề xuất giảm thuế TNDN từ 20% xuống 17% để hỗ trợ doanh nghiệp phục hồi sau đại dịch.",
                },
            ],
        },
        {
            title: "Tin nổi bật",
            slug: "tin-noi-bat",
            articles: [
                {
                    title: "Giá xăng dầu có thể tăng mạnh trong kỳ điều chỉnh tới",
                    slug: "gia-xang-dau-co-the-tang-manh",
                    thumbnail: "/classic-gas-station.png",
                    publishedAt: "1 giờ trước",
                    sapo: "Giá xăng dầu thế giới tăng cao do căng thẳng địa chính trị tại Trung Đông.",
                },
                {
                    title: "Siêu bão Hone tiến vào biển Đông, cường độ cấp 12",
                    slug: "sieu-bao-hone-tien-vao-bien-dong",
                    thumbnail: "/typhoon-storm.jpg",
                    publishedAt: "2 giờ trước",
                    sapo: "Bão dự kiến đi vào các tỉnh miền Trung từ đêm nay với gió giật trên cấp 15.",
                },
                {
                    title: "TP.HCM triển khai dự án metro số 2 trị giá 2.1 tỷ USD",
                    slug: "tphcm-trien-khai-metro-so-2",
                    thumbnail: "/classic-gas-station.png",
                    publishedAt: "5 giờ trước",
                    sapo: "Dự án kết nối Bến Thành - Tham Lương dài 11.3km dự kiến hoàn thành vào năm 2028.",
                },
                {
                    title: "Vingroup công bố kế hoạch đầu tư 5 tỷ USD vào năng lượng tái tạo",
                    slug: "vingroup-cong-bo-ke-hoach-dau-tu-nang-luong",
                    thumbnail: "/typhoon-storm.jpg",
                    publishedAt: "7 giờ trước",
                    sapo: "Tập đoàn sẽ xây dựng 10 nhà máy điện gió và mặt trời trong giai đoạn 2025-2030.",
                },
                {
                    title: "Ngân hàng Nhà nước tăng room tín dụng cho 20 ngân hàng",
                    slug: "ngan-hang-nha-nuoc-tang-room-tin-dung",
                    thumbnail: "/classic-gas-station.png",
                    publishedAt: "8 giờ trước",
                    sapo: "Quyết định nhằm hỗ trợ các ngân hàng mở rộng cho vay, thúc đẩy tăng trưởng kinh tế.",
                },
            ],
        },
        {
            title: "Giao thông - Đô thị",
            slug: "giao-thong-do-thi",
            articles: [
                {
                    title: "Hà Nội cấm xe tải trên 10 tuyến đường vào giờ cao điểm",
                    slug: "ha-noi-cam-xe-tai-gio-cao-diem",
                    thumbnail: "/hanoi-traffic.jpg",
                    publishedAt: "30 phút trước",
                    sapo: "Quy định có hiệu lực từ 1/1/2025 nhằm giảm ùn tắc giao thông tại khu vực nội thành.",
                },
                {
                    title: "Cao tốc Bắc - Nam đoạn qua Nghệ An chính thức thông xe",
                    slug: "cao-toc-bac-nam-nghe-an-thong-xe",
                    thumbnail: "/highway-vietnam.jpg",
                    publishedAt: "1 giờ trước",
                    sapo: "Đoạn tuyến dài 78km rút ngắn thời gian di chuyển từ Hà Nội đến Vinh còn 3 giờ.",
                },
                {
                    title: "Dự án đường vành đai 4 TP.HCM được phê duyệt",
                    slug: "du-an-duong-vanh-dai-4-tphcm",
                    thumbnail: "/hanoi-traffic.jpg",
                    publishedAt: "3 giờ trước",
                    sapo: "Tuyến đường dài 66km kết nối 5 tỉnh thành với tổng vốn đầu tư 68.000 tỷ đồng.",
                },
                {
                    title: "Hà Nội xây dựng thêm 3 cầu vượt sông Hồng",
                    slug: "ha-noi-xay-dung-them-3-cau-vuot-song-hong",
                    thumbnail: "/highway-vietnam.jpg",
                    publishedAt: "4 giờ trước",
                    sapo: "Các cầu mới sẽ giúp kết nối nội thành với các quận phía Tây và Bắc thành phố.",
                },
                {
                    title: "TP.HCM mở rộng tuyến metro số 1 đến Bình Dương",
                    slug: "tphcm-mo-rong-tuyen-metro-so-1",
                    thumbnail: "/hanoi-traffic.jpg",
                    publishedAt: "6 giờ trước",
                    sapo: "Dự án mở rộng 15km kết nối với trung tâm hành chính Bình Dương dự kiến khởi công 2025.",
                },
            ],
        },
    ]

    const toggleCategory = (slug: string) => {
        setExpandedCategories((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]))
    }

    return (
        <div className="my-12 border-t-2 border-border pt-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => {
                    const isExpanded = expandedCategories.includes(category.slug)
                    const displayedArticles = isExpanded ? category.articles : category.articles.slice(0, 3)

                    return (
                        <div key={category.slug} className="border-b border-border pb-6 md:border-b-0">
                            <div className="mb-4 border-b-2 border-primary pb-2">
                                <Link to={`/danh-muc/${category.slug}`}
                                      className="inline-block text-lg font-bold text-foreground transition-colors hover:text-primary"
                                >
                                    {category.title}
                                </Link>
                            </div>

                            {/* Articles List */}
                            <div className="space-y-3">
                                {displayedArticles.map((article) => (
                                    <NewsPreview key={article.slug} article={article}/>
                                ))}
                            </div>

                            {/* View More Button */}
                            {category.articles.length > 3 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleCategory(category.slug)}
                                    className="mt-3 w-full gap-1 text-primary hover:bg-primary/10 hover:text-primary"
                                >
                                    {isExpanded ? "Thu gọn" : "Xem thêm"}
                                    <ChevronRight
                                        className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}/>
                                </Button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


