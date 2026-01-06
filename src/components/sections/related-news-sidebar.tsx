import { Link } from "react-router";

import { Clock, TrendingUp } from "lucide-react";

interface RelatedNewsSidebarProps {
  category: string;
}

export function RelatedNewsSidebar(_: RelatedNewsSidebarProps) {
  const relatedNews = [
    {
      title: "Giá USD tăng mạnh, tác động đến thị trường vàng trong nước",
      href: "/kinh-doanh/gia-usd",
      publishedAt: "30 phút trước",
    },
    {
      title: "NHNN cảnh báo về tình trạng buôn lậu vàng qua biên giới",
      href: "/kinh-doanh/buon-lau-vang",
      publishedAt: "1 giờ trước",
    },
    {
      title: "Dự báo giá vàng thế giới có thể chạm mốc 2,100 USD/ounce",
      href: "/kinh-doanh/du-bao-vang",
      publishedAt: "2 giờ trước",
    },
    {
      title: "Chuyên gia khuyên không nên mua vàng ở thời điểm này",
      href: "/kinh-doanh/chuyen-gia-vang",
      publishedAt: "3 giờ trước",
    },
  ];

  const mostRead = [
    {
      title: "Chính phủ công bố gói hỗ trợ 50 nghìn tỷ đồng cho doanh nghiệp",
      href: "/kinh-doanh/ho-tro-doanh-nghiep",
      views: "125K",
    },
    {
      title: "VN-Index vượt mốc 1,300 điểm sau 3 phiên tăng liên tiếp",
      href: "/kinh-doanh/vn-index",
      views: "98K",
    },
    {
      title: "Giá xăng dầu dự kiến tăng mạnh trong kỳ điều chỉnh tiếp theo",
      href: "/kinh-doanh/gia-xang-dau",
      views: "87K",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tin liên quan */}
      <div className="rounded-xl border border-border/50 bg-card shadow-sm p-4">
        <h3 className="mb-4 flex items-center text-sm font-bold uppercase tracking-wider text-primary border-b pb-2">
          <Clock className="mr-2 h-4 w-4" />
          Tin liên quan
        </h3>
        <div className="space-y-4">
          {relatedNews.map((news, index) => (
            <Link key={index} to={news.href} className="group block">
              <h4 className="mb-1 line-clamp-3 text-sm font-semibold leading-relaxed text-foreground/90 transition-colors group-hover:text-primary">
                {news.title}
              </h4>
              <span className="text-xs text-muted-foreground">
                {news.publishedAt}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Đọc nhiều nhất */}
      <div className="rounded-xl border border-border/50 bg-card shadow-sm p-4">
        <h3 className="mb-4 flex items-center text-sm font-bold uppercase tracking-wider text-primary border-b pb-2">
          <TrendingUp className="mr-2 h-4 w-4" />
          Đọc nhiều nhất
        </h3>
        <div className="space-y-4">
          {mostRead.map((news, index) => (
            <Link key={index} to={news.href} className="group block">
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h4 className="mb-1 line-clamp-2 text-sm font-semibold leading-relaxed text-foreground/90 transition-colors group-hover:text-primary">
                    {news.title}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {news.views} lượt xem
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
