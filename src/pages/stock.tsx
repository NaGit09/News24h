import { useStock } from "@/hooks/use-stock";
import { useRSSByCategory } from "@/hooks/use-rss";
import { Calendar } from "lucide-react";
import { lazy } from "react";
import Splitting from "@/components/common/splitting.tsx";

const StockChart = lazy(() => import("@/components/stock/stock-chart"));
const StockTable = lazy(() => import("@/components/stock/stock-table"));
const StockNewsList = lazy(() => import("@/components/stock/stock-news-list"));

const StockPage = () => {
  const { data, loading, error } = useStock();
  const { articles: newsArticles } = useRSSByCategory("Kinh doanh");

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Chứng khoán thế giới
          </h1>
          <p className="text-gray-500 text-lg">
            Xem thông tin và tin tức về chứng khoán thế giới.
          </p>
        </div>

        {!loading && !error && data && data.length > 0 && (
          <div className="space-y-8">

            <Splitting>
              <StockChart data={data} />
            </Splitting>

            <Splitting>
              <StockTable data={data} />
            </Splitting>

            {/* Recommended News Section */}
            <Splitting>
              <div className="pt-8 border-t border-gray-200">
                <StockNewsList articles={newsArticles} />
              </div>
            </Splitting>
          </div>
        )}

        {!loading && !error && (!data || data.length === 0) && (
          <div className="text-center bg-white p-12 rounded-xl border border-gray-100 shadow-sm mt-8">
            <div className="text-gray-400 mb-3">
              <Calendar size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Không có dữ liệu
            </h3>
            <p className="text-gray-500">
              Không có dữ liệu cổ tức nào để hiển thị vào lúc này.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockPage;
