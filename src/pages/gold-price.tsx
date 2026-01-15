import { useGold } from "@/hooks/use-gold";
import { lazy } from "react";
import Splitting from "@/components/common/splitting.tsx";

const GoldPriceChart = lazy(() => import("@/components/gold/gold-chart.tsx"));
const GoldTodayYesterdayTable = lazy(() => import("@/components/gold/gold-data.tsx"));
const GoldNewsList = lazy(() => import("@/components/gold/gold-news-list.tsx"));

export default function GoldPricePage() {
  const { currentDate } = useGold();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Giá vàng</h1>
      <h6 className="text-sm mb-4">
        Nguồn: giavang.net và pnj.com.vn - Cập nhật lúc 23:58 (
        {currentDate.split("-").reverse().join("/")})
      </h6>
      {/* Chart and table data */}
      <div className="flex justify-between gap-3">
        <Splitting>
          <GoldTodayYesterdayTable />
        </Splitting>
        <Splitting>
          <GoldPriceChart />
        </Splitting>
      </div>
      {/* Related news */}
      <div className="relation">
        <Splitting>
          <GoldNewsList />
        </Splitting>
      </div>
    </div>
  );
}
