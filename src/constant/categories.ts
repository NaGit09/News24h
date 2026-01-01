import type { CategorySection } from "@/types/category";

export interface CategoryConfig {
    name: string;
    slug: string;
    rssUrl: string;
    description?: string;
}

export const CATEGORIES: CategoryConfig[] = [
    {name: "Tin tức", slug: "tin-tuc", rssUrl: "/api/rss/tintuctrongngay.rss"},
    {name: "Bóng đá", slug: "bong-da", rssUrl: "/api/rss/bongda.rss"},
    {name: "An ninh", slug: "an-ninh", rssUrl: "/api/rss/anninhhinhsu.rss"},
    {name: "Thời trang", slug: "thoi-trang", rssUrl: "/api/rss/thoitrang.rss"},
    {name: "Hi-tech", slug: "hi-tech", rssUrl: "/api/rss/thoitranghitech.rss"},
    {name: "Kinh doanh", slug: "kinh-doanh", rssUrl: "/api/rss/taichinhbatdongsan.rss"},
    {name: "Ẩm thực", slug: "am-thuc", rssUrl: "/api/rss/amthuc.rss"},
    {name: "Làm đẹp", slug: "lam-dep", rssUrl: "/api/rss/lamdep.rss"},
    {name: "Phim", slug: "phim", rssUrl: "/api/rss/phim.rss"},
    {name: "Giáo dục", slug: "giao-duc", rssUrl: "/api/rss/giaoducduhoc.rss"},
    {name: "Bạn trẻ", slug: "ban-tre", rssUrl: "/api/rss/bantrecuocsong.rss"},
    {name: "Ca nhạc", slug: "ca-nhac", rssUrl: "/api/rss/canhacmtv.rss"},
    {name: "Thể thao", slug: "the-thao", rssUrl: "/api/rss/thethao.rss"},
    {name: "Phi thường", slug: "phi-thuong", rssUrl: "/api/rss/phithuongkyquac.rss"},
    {name: "Công nghệ", slug: "cong-nghe", rssUrl: "/api/rss/congnghethongtin.rss"},
    {name: "Ô tô", slug: "o-to", rssUrl: "/api/rss/oto.rss"},
    {name: "Thị trường", slug: "thi-truong", rssUrl: "/api/rss/thitruongtieudung.rss"},
    {name: "Du lịch", slug: "du-lich", rssUrl: "/api/rss/dulich.rss"},
    {name: "Sức khỏe", slug: "suc-khoe", rssUrl: "/api/rss/suckhoedoisong.rss"},
    {name: "Cười", slug: "cuoi", rssUrl: "/api/rss/cuoi24h.rss"},
];

export const CATEGORY_BY_SLUG = new Map<string, CategoryConfig>(
    CATEGORIES.map(cat => [cat.slug, cat])
);

export const CATEGORY_BY_NAME = new Map<string, CategoryConfig>(
    CATEGORIES.map(cat => [cat.name, cat])
);

export const CATEGORY_URL_MAP: Record<string, string> = Object.fromEntries(
    CATEGORIES.map(cat => [cat.name, cat.rssUrl])
);

export const RSS_CATEGORIES = CATEGORIES.map(cat => ({
    url: cat.rssUrl,
    category: cat.name
}));

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
    return CATEGORY_BY_SLUG.get(slug);
}

export function getCategoryByName(name: string): CategoryConfig | undefined {
    return CATEGORY_BY_NAME.get(name);
}

export function getCategoryName(slug: string): string | null {
    return CATEGORY_BY_SLUG.get(slug)?.name || null;
}

export function getRssUrl(categoryName: string): string | null {
    return CATEGORY_BY_NAME.get(categoryName)?.rssUrl || null;
}

export function getCategorySlug(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export function isValidCategorySlug(slug: string): boolean {
    return CATEGORY_BY_SLUG.has(slug);
}

export function getAllCategoryNames(): string[] {
    return CATEGORIES.map(cat => cat.name);
}

export function getAllCategorySlugs(): string[] {
    return CATEGORIES.map(cat => cat.slug);
}

export const categoriesSuggestions: CategorySection[] = [
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