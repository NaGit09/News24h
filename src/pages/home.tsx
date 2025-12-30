
import { NewsCardFeatured } from "@/components/news/news-card-featured.tsx"
import { NewsCardSmall } from "@/components/news/news-card-small.tsx"
import { NewsStack } from "@/components/news/news-stack.tsx"
import { SportWidget } from "@/components/widgets/sport-widget.tsx"
import { CategoryBlock } from "@/components/sections/category-block.tsx"
import { SidebarTrending } from "@/components/sections/sidebar-trending.tsx"
import { BreakingNewsBanner } from "@/components/sections/breaking-news-banner.tsx"
import { useRSSFeeds } from "@/hooks/use-rss"
import { SkeletonNewsCardSmall } from "@/components/news/skeleton-news-card.tsx"

export default function HomePage() {
  const { articles, loading, error } = useRSSFeeds()

  if (loading) {
    return (
      <div className="bg-background">
        <BreakingNewsBanner />
        <div className="container mx-auto px-4 py-6">
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-3">
              <div className="animate-pulse bg-muted h-64 rounded" />
              {[...Array(5)].map((_, i) => (
                <SkeletonNewsCardSmall key={i} />
              ))}
            </div>
            <div className="lg:col-span-3">
              <div className="animate-pulse bg-muted h-96 rounded" />
            </div>
            <div className="lg:col-span-3">
              <div className="animate-pulse bg-muted h-96 rounded" />
            </div>
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

  // Transform RSS articles to component props
  const heroNews = articles[0] ? {
    title: articles[0].title,
    sapo: articles[0].description.substring(0, 200) + '...',
    image: articles[0].image && articles[0].image.trim() !== '' ? articles[0].image : "/placeholder.svg",
    category: articles[0].category || "Tin tức",
    href: `/bai-viet/${articles[0].guid}`,
    publishedAt: new Date(articles[0].pubDate).toLocaleString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    }),
  } : {
    title: "Chính phủ công bố gói hỗ trợ kinh tế 50 nghìn tỷ đồng cho doanh nghiệp vừa và nhỏ",
    sapo: "Thủ tướng Chính phủ vừa ký quyết định phê duyệt gói hỗ trợ tài chính trị giá 50 nghìn tỷ đồng nhằm hỗ trợ các doanh nghiệp vừa và nhỏ vượt qua khó khăn, tạo động lực phát triển kinh tế.",
    image: "/government-economic-support-business.jpg",
    category: "Kinh tế",
    href: "/bai-viet/chinh-phu-cong-bo-goi-ho-tro",
    publishedAt: "2 giờ trước",
  }

  const smallNews = articles.slice(1, 6).map(article => ({
    title: article.title,
    sapo: article.description.substring(0, 150) + '...',
    image: article.image && article.image.trim() !== '' ? article.image : "/placeholder.svg",
    href: `/bai-viet/${article.guid}`,
    publishedAt: new Date(article.pubDate).toLocaleString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    }),
  }))

  const newsStackItems = articles.slice(6, 16).map(article => ({
    title: article.title,
    sapo: article.description.substring(0, 100) + '...',
    href: `/bai-viet/${article.guid}`,
    publishedAt: new Date(article.pubDate).toLocaleString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    }),
  }))

  const trendingNews = articles.slice(16, 21).map((article, index) => ({
    title: article.title,
    image: article.image && article.image.trim() !== '' ? article.image : "/placeholder.svg",
    href: `/bai-viet/${article.guid}`,
    views: `${Math.floor(Math.random() * 100 + 50)}K`,
  }))

  return (
    <div className="bg-background">
      <BreakingNewsBanner />

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4 lg:grid-cols-12 mb-6 pb-6 border-b border-border">
          <div className="lg:col-span-6 space-y-3">
            <NewsCardFeatured {...heroNews} />
            <div className="space-y-0 border-t border-border pt-3">
              {smallNews.map((news, index) => (
                <NewsCardSmall key={index} {...news} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <NewsStack items={newsStackItems} />
          </div>

          <div className="lg:col-span-3 space-y-3">
            <SportWidget />
            <div className="border border-border overflow-hidden">
              <h4 className="border-b-2 border-primary bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
                Video nổi bật
              </h4>
              <div className="aspect-video overflow-hidden">
                <img src="/news-video-thumbnail.png" alt="Video" className="h-full w-full object-cover" />
              </div>
            </div>
            <SidebarTrending items={trendingNews} />
          </div>
        </div>

        {/* Category Block - Bóng đá */}
        <CategoryBlock
          category="Bóng đá"
          subTags={["V.League", "Ngoại hạng Anh", "La Liga", "Champions League"]}
          featured={{
            title: "HLV Park Hang-seo trở lại dẫn dắt CLB Thành phố Hồ Chí Minh",
            sapo: "Sau thời gian nghỉ ngơi, HLV Park Hang-seo chính thức ký hợp đồng 2 năm với CLB TPHCM, mở ra kỷ nguyên mới cho bóng đá Việt Nam.",
            image: "/football-coach-stadium.jpg",
            href: "/bai-viet/hlv-park-hang-seo",
            publishedAt: "30 phút trước",
          }}
          gridItems={[
            {
              title: "Quang Hải ghi bàn đẳng cấp giúp đội nhà thắng đậm 4-0",
              sapo: "Cú sút phạt thành bàn từ khoảng cách 25m của Quang Hải được bình chọn là bàn thắng đẹp nhất vòng.",
              image: "/football-goal-celebration.jpg",
              href: "/bai-viet/quang-hai-ghi-ban",
              publishedAt: "1 giờ trước",
            },
            {
              title: "Man City vs Arsenal: Đại chiến quyết định ngôi đầu bảng",
              sapo: "Trận cầu tâm điểm vòng 25 Premier League hứa hẹn nhiều kịch tính với 2 đội dẫn đầu.",
              image: "/premier-league-match.png",
              href: "/bai-viet/man-city-vs-arsenal",
              publishedAt: "2 giờ trước",
            },
            {
              title: "Ronaldo chia tay Al Nassr, chuẩn bị trở về châu Âu",
              sapo: "Nhiều CLB hàng đầu châu Âu đang liên hệ với đại diện của CR7 cho mùa giải mới.",
              image: "/ronaldo-football.jpg",
              href: "/bai-viet/ronaldo-chia-tay",
              publishedAt: "3 giờ trước",
            },
          ]}
          bulletList={[
            {
              title: "Messi ghi hat-trick trong chiến thắng 5-1 của Inter Miami",
              href: "/bai-viet/messi-hat-trick",
              publishedAt: "4 giờ trước",
            },
            {
              title: "Real Madrid chi 150 triệu euro mua Haaland",
              href: "/bai-viet/real-mua-haaland",
              publishedAt: "5 giờ trước",
            },
            {
              title: "V.League 2025 khởi tranh vào ngày 1/3",
              href: "/bai-viet/v-league-2025",
              publishedAt: "6 giờ trước",
            },
          ]}
        />

        {/* Category Block - Tin tức */}
        <CategoryBlock
          category="Tin tức"
          subTags={["Xã hội", "Chính trị", "Giao thông", "Đời sống"]}
          featured={{
            title: "Quốc hội thông qua Luật Đất đai sửa đổi với nhiều điểm mới quan trọng",
            sapo: "Luật có nhiều điểm mới về quyền sử dụng đất, chuyển nhượng và bồi thường giải phóng mặt bằng.",
            image: "/government-meeting.png",
            href: "/bai-viet/luat-dat-dai-sua-doi",
            publishedAt: "40 phút trước",
          }}
          gridItems={[
            {
              title: "Hà Nội triển khai 5 tuyến buýt điện đầu tiên từ tháng 3/2025",
              sapo: "Dự án trị giá 2,000 tỷ đồng với 100 xe buýt điện hiện đại, thân thiện môi trường.",
              image: "/hanoi-traffic.jpg",
              href: "/bai-viet/ha-noi-buyt-dien",
              publishedAt: "1 giờ trước",
            },
            {
              title: "Tăng lương tối thiểu vùng thêm 6% từ ngày 1/7/2025",
              sapo: "Vùng I tăng lên 5.58 triệu đồng/tháng, áp dụng cho 13 triệu lao động.",
              image: "/government-economic-support-business.jpg",
              href: "/bai-viet/tang-luong-toi-thieu",
              publishedAt: "2 giờ trước",
            },
            {
              title: "Bắt giữ đường dây mua bán ma túy xuyên quốc gia",
              sapo: "Công an phối hợp quốc tế triệt phá đường dây với 500kg ma túy tổng hợp.",
              image: "/police-announcement.jpg",
              href: "/bai-viet/bat-duong-day-ma-tuy",
              publishedAt: "3 giờ trước",
            },
          ]}
          bulletList={[
            {
              title: "TP.HCM xây dựng 500,000 căn nhà ở xã hội đến 2030",
              href: "/bai-viet/nha-o-xa-hoi",
              publishedAt: "4 giờ trước",
            },
            {
              title: "Cao tốc Bắc - Nam hoàn thành đoạn Cam Lộ - La Sơn",
              sapo: "Công trình này sẽ giảm thời gian đi lại giữa các tỉnh miền Bắc.",
              image: "/hanoi-road-construction.jpg",
              href: "/bai-viet/cao-toc-bac-nam",
              publishedAt: "5 giờ trước",
            },
            {
              title: "Phát hiện 50 ca nhiễm sởi tại các tỉnh miền Tây",
              sapo: "Các cơ sở y tế đã triển khai các biện pháp phòng chống dịch bệnh.",
              image: "/typhoon-storm.jpg",
              href: "/bai-viet/dich-soi",
              publishedAt: "6 giờ trước",
            },
          ]}
        />

        {/* Category Block - Hi-tech */}
        <CategoryBlock
          category="Hi-tech"
          subTags={["Công nghệ AI", "Điện thoại", "Laptop", "Game"]}
          featured={{
            title: "Apple ra mắt iPhone 16 Pro với chip A19 Bionic và camera 200MP",
            sapo: "Sự kiện ra mắt sản phẩm mới của Apple đã giới thiệu iPhone 16 Pro với nhiều nâng cấp đột phá về hiệu năng và camera.",
            image: "/modern-smartphone-technology.jpg",
            href: "/bai-viet/iphone-16-pro-ra-mat",
            publishedAt: "1 giờ trước",
          }}
          gridItems={[
            {
              title: "Google Gemini 2.0 vượt trội ChatGPT trong các bài test IQ",
              sapo: "Model AI mới của Google đạt 98% độ chính xác trong các bài test logic và toán học.",
              image: "/ai-artificial-intelligence-technology.jpg",
              href: "/bai-viet/google-gemini-2-0",
              publishedAt: "2 giờ trước",
            },
            {
              title: "Samsung Galaxy S25 Ultra có bút S Pen với tính năng AI mới",
              sapo: "S Pen tích hợp AI có thể dịch văn bản và tóm tắt tài liệu real-time.",
              image: "/samsung-smartphone-stylus.jpg",
              href: "/bai-viet/samsung-s25-ultra",
              publishedAt: "3 giờ trước",
            },
            {
              title: "Tesla ra mắt robot Optimus Gen 3 có thể làm việc nhà",
              sapo: "Robot có khả năng nấu ăn, dọn dẹp và chăm sóc người già với giá 20,000 USD.",
              image: "/humanoid-robot-technology.jpg",
              href: "/bai-viet/tesla-robot-optimus",
              publishedAt: "4 giờ trước",
            },
          ]}
          bulletList={[
            {
              title: "Meta ra mắt kính thực tế ảo Quest 4 giá 499 USD",
              href: "/bai-viet/meta-quest-4",
              publishedAt: "5 giờ trước",
            },
            {
              title: "Nvidia công bố GPU RTX 5090 mạnh gấp đôi thế hệ cũ",
              href: "/bai-viet/nvidia-rtx-5090",
              publishedAt: "6 giờ trước",
            },
            {
              title: "TikTok ra mắt tính năng AI tạo video tự động",
              href: "/bai-viet/tiktok-ai-video",
              publishedAt: "7 giờ trước",
            },
          ]}
        />

        {/* Category Block - Giải trí */}
        <CategoryBlock
          category="Giải trí"
          subTags={["Sao Việt", "Sao Âu Mỹ", "Phim ảnh", "Âm nhạc"]}
          featured={{
            title: "Đen Vâu công bố album mới sau 3 năm vắng bóng",
            sapo: "Nam rapper tiết lộ album sẽ có 15 track với sự góp mặt của nhiều ca sĩ nổi tiếng trong và ngoài nước.",
            image: "/vietnamese-rapper-music.jpg",
            href: "/bai-viet/den-vau-album-moi",
            publishedAt: "1 giờ trước",
          }}
          gridItems={[
            {
              title: "Taylor Swift công bố tour diễn Việt Nam vào tháng 8/2025",
              sapo: "Đêm diễn duy nhất tại Mỹ Đình với 40,000 khán giả, vé mở bán từ tháng 3.",
              image: "/taylor-swift-concert.jpg",
              href: "/bai-viet/taylor-swift-tour",
              publishedAt: "2 giờ trước",
            },
            {
              title: "Phim Mai của Trấn Thành đạt 500 tỷ doanh thu sau 2 tuần",
              sapo: "Trở thành phim Việt có doanh thu cao thứ 2 mọi thời đại, chỉ sau Lật mặt 7.",
              image: "/vietnam-cinema-movie.jpg",
              href: "/bai-viet/phim-mai-500-ty",
              publishedAt: "3 giờ trước",
            },
            {
              title: "Oscar 2025: Đề cử Phim hay nhất gây bất ngờ lớn",
              sapo: "Oppenheimer dẫn đầu với 13 đề cử, Poor Things và Killers of the Flower Moon theo sau.",
              image: "/oscars-awards-ceremony.jpg",
              href: "/bai-viet/oscar-2025-de-cu",
              publishedAt: "4 giờ trước",
            },
          ]}
          bulletList={[
            {
              title: "Sơn Tùng M-TP tung MV mới đạt 10 triệu view sau 6 giờ",
              href: "/bai-viet/son-tung-mv-moi",
              publishedAt: "5 giờ trước",
            },
            {
              title: "The Weeknd thông báo tour thế giới After Hours Til Dawn",
              sapo: "Tours sẽ diễn ra tại 10 quốc gia với sự góp mặt của nhiều nghệ sĩ quốc tế.",
              href: "/bai-viet/the-weeknd-tour",
              publishedAt: "6 giờ trước",
            },
            {
              title: "Netflix công bố phần 2 của Squid Game ra mắt tháng 6",
              sapo: "Phần 2 tiếp tục câu chuyện của các người chơi trong trò chơi Squid Game.",
              href: "/bai-viet/squid-game-season-2",
              publishedAt: "7 giờ trước",
            },
          ]}
        />

        {/* Category Block - Sức khỏe */}
        <CategoryBlock
          category="Sức khỏe"
          subTags={["Dinh dưỡng", "Làm đẹp", "Bệnh tật", "Sống khỏe"]}
          featured={{
            title: "Bộ Y tế cảnh báo dịch cúm A đang gia tăng tại các thành phố lớn",
            sapo: "Số ca mắc cúm A/H1N1 tăng 40% so với tháng trước, Bộ Y tế khuyến cáo người dân nên tiêm vaccine phòng bệnh.",
            image: "/healthcare-hospital-medical.jpg",
            href: "/bai-viet/canh-bao-dich-cum-a",
            publishedAt: "30 phút trước",
          }}
          gridItems={[
            {
              title: "5 thực phẩm giúp tăng cường hệ miễn dịch trong mùa đông",
              sapo: "Tỏi, gừng, cam, cải xanh và sữa chua là các thực phẩm giàu vitamin C và kháng thể.",
              image: "/healthy-food-nutrition.jpg",
              href: "/bai-viet/thuc-pham-tang-mien-dich",
              publishedAt: "1 giờ trước",
            },
            {
              title: "Phát hiện mới về tác dụng của cà phê với sức khỏe tim mạch",
              sapo: "Uống 2-3 tách cà phê mỗi ngày giúp giảm 20% nguy cơ mắc bệnh tim mạch.",
              image: "/coffee-health-heart.jpg",
              href: "/bai-viet/ca-phe-suc-khoe",
              publishedAt: "2 giờ trước",
            },
            {
              title: "Bài tập yoga 15 phút giúp giảm stress hiệu quả",
              sapo: "Các động tác yoga đơn giản có thể thực hiện tại nhà mỗi sáng.",
              image: "/vietnam-rice-export.jpg",
              href: "/bai-viet/yoga-giam-stress",
              publishedAt: "3 giờ trước",
            },
          ]}
          bulletList={[
            {
              title: "WHO khuyến cáo giảm lượng đường tiêu thụ xuống 25g/ngày",
              href: "/bai-viet/who-giam-duong",
              publishedAt: "4 giờ trước",
            },
            {
              title: "Ngủ đủ 7-8 tiếng giúp tăng tuổi thọ lên 5 năm",
              href: "/bai-viet/ngu-du-giac",
              publishedAt: "5 giờ trước",
            },
            {
              title: "Phát hiện thuốc mới điều trị ung thư phổi giai đoạn cuối",
              sapo: "Thuốc mới này có thể giúp tăng tỷ lệ sống sót của bệnh nhân ung thư phổi.",
              href: "/bai-viet/thuoc-tri-ung-thu",
              publishedAt: "6 giờ trước",
            },
          ]}
        />

        {/* Category Block - Ô tô */}
        <CategoryBlock
          category="Ô tô"
          subTags={["Thị trường", "Ra mắt", "Tư vấn", "Thế giới xe"]}
          featured={{
            title: "VinFast VF 9 giảm giá 300 triệu đồng trong tháng 1/2025",
            sapo: "Chương trình ưu đãi đặc biệt của VinFast nhằm kích thích tiêu dùng xe điện trong nước với nhiều gói hỗ trợ hấp dẫn.",
            image: "/vinfast-electric-car.jpg",
            href: "/bai-viet/vinfast-vf9-giam-gia",
            publishedAt: "1 giờ trước",
          }}
          gridItems={[
            {
              title: "Tesla Model 3 2025 ra mắt Việt Nam với giá từ 1.2 tỷ đồng",
              sapo: "Phiên bản Long Range có phạm vi hoạt động 600km với một lần sạc đầy.",
              image: "/tesla-model3-electric.jpg",
              href: "/bai-viet/tesla-model3-viet-nam",
              publishedAt: "2 giờ trước",
            },
            {
              title: "Honda CR-V thế hệ mới có gì đáng chú ý?",
              sapo: "Thiết kế mới hiện đại hơn, động cơ hybrid tiết kiệm nhiên liệu và nhiều tính năng an toàn.",
              image: "/honda-crv-suv.jpg",
              href: "/bai-viet/honda-crv-the-he-moi",
              publishedAt: "3 giờ trước",
            },
            {
              title: "Top 10 xe bán chạy nhất Việt Nam tháng 12/2024",
              sapo: "Hyundai Accent dẫn đầu với 2,500 xe, tiếp theo là Toyota Vios và Honda City.",
              image: "/car-showroom-vietnam.jpg",
              href: "/bai-viet/top-10-xe-ban-chay",
              publishedAt: "4 giờ trước",
            },
          ]}
          bulletList={[
            {
              title: "BMW i7 2025 giá từ 5.5 tỷ đồng tại Việt Nam",
              href: "/bai-viet/bmw-i7-2025",
              publishedAt: "5 giờ trước",
            },
            {
              title: "Chính phủ giảm 50% lệ phí trước bạ cho xe điện",
              href: "/bai-viet/giam-le-phi-xe-dien",
              publishedAt: "6 giờ trước",
            },
            {
              title: "Mercedes-Benz EQS SUV chính thức có mặt tại showroom",
              href: "/bai-viet/mercedes-eqs-suv",
              publishedAt: "7 giờ trước",
            },
          ]}
        />
      </div>
    </div>
  )
}


