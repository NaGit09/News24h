import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GoldPriceChart } from "@/components/gold/GoldChart";
import { GoldTodayYesterdayTable } from "@/components/gold/GoldData";
import {
  setGoldData,
  setCurrentDate,
  setBrand,
  setGoldDateAllBrand,
} from "@/stores/gold.store";
import type { GoldPrice } from "@/types/gold-price";
import { DateSample } from "@/constant/gold";
import { useSelector } from "react-redux";
import { selectCurrentDate } from "@/stores/selector.store";

export default function GoldPricePage() {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectCurrentDate);
  const goldDateSample = DateSample;

  useEffect(() => {
    const normalizeDate = (dateStr: string) => {
      const [d, m, y] = dateStr.split("/");
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    };

    const goldDataMap: Record<string, GoldPrice[]> = {};

    Object.entries(goldDateSample).forEach(([brand, prices]) => {
      goldDataMap[brand] = prices.map((p: any) => ({
        ...p,
        date: normalizeDate(p.date),
      }));
    });

    const goldAllData: Record<string, GoldPrice[]> = {};

    Object.entries(goldDateSample).forEach(([brand, prices]) => {
      goldAllData[brand] = prices.map((p: any) => ({
        ...p,
        date: normalizeDate(p.date),
      }));
    });

    dispatch(setGoldData(goldDataMap));
    dispatch(setGoldDateAllBrand(goldDataMap));
    
    const today = currentDate;

    dispatch(setCurrentDate(today));

    if (goldDataMap["SJC"]) {
      dispatch(setBrand("SJC"));
    } else {
      dispatch(setBrand(Object.keys(goldDataMap)[0]));
    }
  }, [dispatch]);

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
    </div>
  );
}
