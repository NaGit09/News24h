"use client"


import {Link} from "react-router-dom";

const footerSections = [
  {
    title: "Tin tức",
    links: [
      "Tin tức trong ngày",
      "Chính trị - Xã hội",
      "Thế giới",
      "Giao thông - Đô thị",
      "Nóng trên mạng",
      "Dự báo thời tiết",
    ],
  },
  {
    title: "Bóng đá",
    links: [
      "Lịch thi đấu",
      "Video highlight",
      "Bảng xếp hạng",
      "Ngoại hạng Anh",
      "Champions League",
      "Bóng đá Việt Nam",
    ],
  },
  {
    title: "Kinh doanh",
    links: ["Kinh tế thế giới", "Bất động sản", "Ngân hàng", "Giá vàng", "Chứng khoán", "Khởi nghiệp"],
  },
  {
    title: "Thể thao",
    links: ["Tennis", "Pickleball", "Bóng chuyền", "Võ thuật - UFC", "Golf", "F1"],
  },
  {
    title: "Giải trí",
    links: ["Showbiz", "Sao Việt", "Sao Châu Á", "Nhạc", "Phim", "TV Show"],
  },
  {
    title: "Hi-tech",
    links: ["Công nghệ AI", "Điện thoại", "Laptop", "Game", "Khoa học", "Thời trang Hi-tech"],
  },
  {
    title: "Sức khỏe & Đời sống",
    links: ["Sức khỏe dinh dưỡng", "Ẩm thực", "Du lịch", "Giáo dục", "Làm đẹp", "Thời trang"],
  },
  {
    title: "Ô tô - Xe máy",
    links: ["Tin tức ô tô", "Bảng giá xe", "Tư vấn", "Xe máy", "Xe điện", "Đánh giá"],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-sm mb-4 text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${section.title.toLowerCase()}/${link.toLowerCase()}`}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-primary">24H</span> TIN TỨC
              </span>
            </button>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <Link href="/gioi-thieu" className="hover:text-primary">
                Giới thiệu
              </Link>
              <Link href="/lien-he" className="hover:text-primary">
                Liên hệ
              </Link>
              <Link href="/quang-cao" className="hover:text-primary">
                Quảng cáo
              </Link>
              <Link href="/dieu-khoan" className="hover:text-primary">
                Điều khoản sử dụng
              </Link>
              <Link href="/chinh-sach" className="hover:text-primary">
                Chính sách bảo mật
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>© 2025 24 TIN TỨC. Bản quyền thuộc về 24h.com.vn</p>
            <p className="mt-2">
              Chịu trách nhiệm nội dung: Tổng Biên tập | Địa chỉ: Tầng 5, Tòa nhà MHDI, 60 Hoàng Văn Thụ, Hà Nội
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
