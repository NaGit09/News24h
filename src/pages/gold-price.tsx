import { GoldPriceChart } from "@/components/gold/GoldChart";
import { GoldTodayYesterdayTable } from "@/components/gold/GoldData";
import { useGold } from "@/hooks/use-gold";
import { GoldNewsList } from "@/components/gold/GoldNewsList";
export default function GoldPricePage() {
  const { currentDate } = useGold();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Giá vàng</h1>
      <h6 className="text-sm mb-4">
        Nguồn: giavang.net và pnj.com.vn - Cập nhật lúc 23:58 (
        {currentDate.split("-").reverse().join("/")})
      </h6>
      <div className="flex justify-between gap-3">
        <GoldTodayYesterdayTable />
        <GoldPriceChart />
      </div>
      <div className="relation">
        <GoldNewsList />
      </div>
    </div>
  );
}
