"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"

const categories = [
  {
    name: "Tin tức",
    items: [
      "Tin tức trong ngày",
      "Xã hội",
      "Tra cứu phường xã",
      "Đời sống - Dân sinh",
      "Giao thông - Đô thị",
      "Nóng trên mạng",
      "Dự báo thời tiết",
      "Lịch vạn niên",
    ],
  },
  {
    name: "Bóng đá",
    items: [
      "Lịch thi đấu bóng đá",
      "Video highlight",
      "Tường thuật trực tiếp",
      "Bảng xếp hạng",
      "Ngoại hạng Anh",
      "Champions League",
      "Bóng đá Việt Nam",
      "Chuyển nhượng",
    ],
  },
  {
    name: "Kinh doanh",
    items: [
      "Kinh tế thế giới",
      "Bất động sản",
      "Doanh nhân",
      "Khởi nghiệp",
      "Ngân hàng",
      "Giá vàng hôm nay",
      "Chứng khoán",
      "Doanh nghiệp",
    ],
  },
  {
    name: "Giải trí",
    items: ["Đời sống Showbiz", "Sao Việt", "Sao Châu Á", "Nhạc", "Phim", "TV Show"],
  },
  {
    name: "24h Thích bóng đá - Thể thao",
    items: ["Thích bóng đá", "Thể thao", "Tin tức thể thao", "Video thể thao"],
  },
  {
    name: "Sức khỏe",
    items: ["Sức khỏe dinh dưỡng", "Tin tức sức khỏe", "Phát minh y học", "Ẩm thực", "Du lịch"],
  },
  {
    name: "Hi-tech",
    items: ["Công nghệ AI", "Điện thoại", "Laptop", "Game", "Thời trang Hi-tech", "Khoa học"],
  },
  {
    name: "Thế giới",
    items: ["Điểm nóng", "Quân sự", "Theo dòng lịch sử", "Cung đình Trung Hoa", "Dài kỳ"],
  },
  {
    name: "Thể thao",
    items: ["Tennis", "Pickleball", "Bóng chuyền", "Võ thuật - UFC", "Golf", "F1", "Billiards"],
  },
  {
    name: "Ô tô",
    items: ["Tin tức ô tô", "Bảng giá xe", "Tư vấn", "Xe xanh", "Đánh giá xe", "Xe máy"],
  },
]

export function MegaMenu({ isScrolled = false }: { isScrolled?: boolean }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showAllCategories, setShowAllCategories] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <nav className="hidden lg:flex items-center gap-1 h-11 text-sm font-medium overflow-visible">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-0.5 mr-4 pr-4 border-r border-border/50 hover:opacity-80 transition-opacity"
          >
            <span className="text-xl font-bold text-primary">24H</span>
            <span className="text-base font-medium tracking-tight whitespace-nowrap ml-1.5">TIN TỨC</span>
          </button>

          <div
            className="relative"
            onMouseEnter={() => setShowAllCategories(true)}
            onMouseLeave={() => setShowAllCategories(false)}
          >
            <button className="flex items-center gap-1.5 px-3 py-2 hover:text-primary transition-all duration-300 whitespace-nowrap relative group">
              <Menu className="h-4 w-4" />
              Danh mục
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>

            {showAllCategories && (
              <div className="absolute top-full left-0 pt-1 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="w-[800px] bg-background border border-border shadow-2xl rounded-sm">
                  <div className="grid grid-cols-3 gap-6 p-6">
                    {categories.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <h3 className="font-bold text-sm text-primary border-b border-border pb-1.5">
                          {category.name}
                        </h3>
                        <ul className="space-y-1.5">
                          {category.items.map((item) => (
                            <li key={item}>
                              <Link
                                href={`/${category.name.toLowerCase()}/${item.toLowerCase()}`}
                                className="text-sm hover:text-primary transition-all duration-300 block relative group pl-2"
                              >
                                {item}
                                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {categories.map((category) => (
            <div
              key={category.name}
              className="relative"
              onMouseEnter={() => setActiveMenu(category.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="px-3 py-2 hover:text-primary transition-all duration-300 whitespace-nowrap relative group">
                {category.name}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>

              {activeMenu === category.name && (
                <div className="absolute top-full left-0 pt-1 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="w-56 bg-background border border-border shadow-2xl rounded-sm">
                    <div className="py-1">
                      {category.items.map((item) => (
                        <Link
                          key={item}
                          href={`/${category.name.toLowerCase()}/${item.toLowerCase()}`}
                          className="block px-4 py-2.5 text-sm hover:text-primary transition-all duration-300 relative group"
                        >
                          {item}
                          <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
