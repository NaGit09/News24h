import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockStore } from "@/stores/stock.store";
import { getStockData } from "@/services/stock.service";
import StockChart from "@/components/stock/StockChart";
import StockStats from "@/components/stock/StockStats";
import StockTable from "@/components/stock/StockTable";
import { StockNewsList } from "@/components/stock/StockNewsList";
import { useRSSByCategory } from "@/hooks/use-rss";
import type { RootState, AppDispatch } from "@/stores/root.store";
import { Calendar } from "lucide-react";

const StockPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.stock
  );

  const { articles: newsArticles } = useRSSByCategory("Kinh doanh");

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || data.length > 0) return;
    initialized.current = true;

    const fetchData = async () => {
      dispatch(stockStore.actions.setLoading(true));
      try {
        const response = await getStockData();
        if (response && response.results) {
          dispatch(stockStore.actions.setData(response.results));
        } else {
          dispatch(stockStore.actions.setLoading(false));
        }
      } catch (err: unknown) {
        let errorMessage = "Failed to fetch stock data";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        dispatch(stockStore.actions.setError(errorMessage));
      }
    };
    fetchData();
  }, [dispatch, data.length]);

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

        {loading && (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Lỗi tải dữ liệu: {error}</span>
          </div>
        )}

        {!loading && !error && data && data.length > 0 && (
          <div className="space-y-8">
            <StockStats data={data} />
            <StockChart data={data} />
            <StockTable data={data} />

            {/* Recommended News Section */}
            <div className="pt-8 border-t border-gray-200">
              <StockNewsList articles={newsArticles} />
            </div>
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
