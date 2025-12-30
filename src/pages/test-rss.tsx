import { useRSSFeeds } from "@/hooks/use-rss"

export default function TestRSSPage() {
  const { articles, loading, error } = useRSSFeeds()

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Test RSS Feeds</h1>
      
      {loading && <p>Đang tải RSS feeds...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Lỗi:</p>
          <p>{error.message}</p>
        </div>
      )}
      
      {!loading && !error && (
        <div>
          <p className="mb-4">Tổng số bài viết: {articles.length}</p>
          
          <div className="space-y-4">
            {articles.slice(0, 10).map((article, index) => (
              <div key={index} className="border p-4 rounded">
                <h3 className="font-bold">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.category}</p>
                <p className="text-sm">{article.description.substring(0, 100)}...</p>
                {article.image && (
                  <div className="mt-2">
                    <p className="text-xs text-green-600">Có hình ảnh: {article.image}</p>
                    <img src={article.image} alt={article.title} className="w-32 h-32 object-cover mt-2" />
                  </div>
                )}
                {!article.image && (
                  <p className="text-xs text-red-600 mt-2">Không có hình ảnh</p>
                )}
                <p className="text-xs text-gray-500 mt-2">{article.pubDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
