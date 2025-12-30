import {Link} from "react-router"

const footerSections = [
    {
        title: "Tin tức",
        slug: "tin-tuc",
        links: [
            {text: "Tin tức trong ngày", slug: "tin-tuc"},
            {text: "An ninh hình sự", slug: "an-ninh"},
            {text: "Thế giới", slug: "the-gioi"},
            {text: "Phi thường", slug: "phi-thuong"},
        ],
    },
    {
        title: "Bóng đá",
        slug: "bong-da",
        links: [
            {text: "Bóng đá Việt Nam", slug: "bong-da"},
            {text: "Bóng đá quốc tế", slug: "bong-da"},
            {text: "Thể thao", slug: "the-thao"},
        ],
    },
    {
        title: "Kinh doanh",
        slug: "kinh-doanh",
        links: [
            {text: "Tài chính", slug: "kinh-doanh"},
            {text: "Thị trường", slug: "thi-truong"},
            {text: "Giá vàng", slug: "gia-vang"},
        ],
    },
    {
        title: "Giải trí",
        slug: "giai-tri",
        links: [
            {text: "Phim ảnh", slug: "phim"},
            {text: "Ca nhạc", slug: "ca-nhac"},
            {text: "Bạn trẻ", slug: "ban-tre"},
        ],
    },
    {
        title: "Hi-tech",
        slug: "hi-tech",
        links: [
            {text: "Công nghệ", slug: "cong-nghe"},
            {text: "Thời trang Hi-tech", slug: "hi-tech"},
        ],
    },
    {
        title: "Sức khỏe",
        slug: "suc-khoe",
        links: [
            {text: "Sức khỏe đời sống", slug: "suc-khoe"},
            {text: "Ẩm thực", slug: "am-thuc"},
            {text: "Làm đẹp", slug: "lam-dep"},
        ],
    },
    {
        title: "Đời sống",
        slug: "tin-tuc",
        links: [
            {text: "Thời trang", slug: "thoi-trang"},
            {text: "Du lịch", slug: "du-lich"},
            {text: "Giáo dục", slug: "giao-duc"},
        ],
    },
    {
        title: "Ô tô",
        slug: "o-to",
        links: [
            {text: "Tin tức ô tô", slug: "o-to"},
            {text: "Đánh giá xe", slug: "o-to"},
        ],
    },
]

export function Footer() {
    return (
        <footer className="border-t border-border bg-muted/30 mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-12">
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <Link to={`/${section.slug}`}
                                  className="font-bold text-sm mb-4 text-foreground hover:text-primary block">
                                {section.title}
                            </Link>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.text}>
                                        <Link to={`/${link.slug}`}
                                              className="text-xs text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-border pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-primary">24H</span> TIN TỨC
              </span>
                        </Link>

                        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                            <Link to="/gioi-thieu" className="hover:text-primary">
                                Giới thiệu
                            </Link>
                            <Link to="/lien-he" className="hover:text-primary">
                                Liên hệ
                            </Link>
                            <Link to="/quang-cao" className="hover:text-primary">
                                Quảng cáo
                            </Link>
                            <Link to="/dieu-khoan" className="hover:text-primary">
                                Điều khoản sử dụng
                            </Link>
                            <Link to="/chinh-sach" className="hover:text-primary">
                                Chính sách bảo mật
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-xs text-muted-foreground">
                        <p>© 2025 24 TIN TỨC. Bản quyền thuộc về 24h.com.vn</p>
                        <p className="mt-2">
                            Chịu trách nhiệm nội dung: Tổng Biên tập | Địa chỉ: Tầng 5, Tòa nhà MHDI, 60 Hoàng Văn Thụ,
                            Hà Nội
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}


