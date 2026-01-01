import { Link, useParams } from "react-router";
import { Breadcrumbs } from "@/components/layout/breadcrumbs.tsx";
import { CategoryFilterTabs } from "@/components/common/CategoryFilterTabs";

export default function TagPage() {
  const { tag } = useParams<{ tag: string }>();
  const tagName = (tag || "")
    .replace(/-/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const articles = [
    {
      id: 1,
      title: "Giá vàng SJC tăng vượt mốc 83 triệu đồng/lượng",
      sapo: "Giá vàng tiếp tục xu hướng tăng mạnh trong bối cảnh lo ngại lạm phát toàn cầu.",
      image: "/gold-price-chart-trending.jpg",
      category: "Kinh doanh",
      time: "2 giờ trước",
      slug: "gia-vang-sjc-tang",
    },
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs
          items={[
            { label: "Trang chủ", href: "/" },
            { label: `Tag: ${tagName}`, href: `/tag/${tag}` },
          ]}
        />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bài viết về: {tagName}
          </h1>
          <p className="text-muted-foreground mb-6">
            {articles.length} bài viết được gắn tag này
          </p>

          <CategoryFilterTabs
            onFilterChange={(filter) => console.log(filter)}
          />

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group border-b border-border pb-6"
              >
                <Link to={`/bai-viet/${article.slug}`} className="block">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover mb-3"
                  />
                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {article.sapo}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.time}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
