import React, { useMemo, useRef } from "react";
import { format } from "date-fns";
import type { StockData } from "@/types/stock";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarDaysIcon,
  type CalendarDaysIconHandle,
} from "../ui/calendar-days";
import { TrendingUpIcon, type TrendingUpIconHandle } from "../ui/trending-up";
import {
  CircleDollarSignIcon,
  type CircleDollarSignIconHandle,
} from "../ui/circle-dollar-sign";
import { ActivityIcon, type ActivityIconHandle } from "../ui/activity";

interface StockStatsProps {
  data: StockData[];
}

const StockStats: React.FC<StockStatsProps> = ({ data }) => {
  const totalPayoutRef = useRef<CircleDollarSignIconHandle>(null);
  const averagePayoutRef = useRef<TrendingUpIconHandle>(null);
  const latestPayoutRef = useRef<CalendarDaysIconHandle>(null);
  const eventsRef = useRef<ActivityIconHandle>(null);

  const statistics = useMemo(() => {
    if (!data || data.length === 0) return null;

    const sortedByDate = [...data].sort(
      (a, b) =>
        new Date(b.ex_dividend_date).getTime() -
        new Date(a.ex_dividend_date).getTime()
    );
    const totalPayout = data.reduce((acc, curr) => acc + curr.cash_amount, 0);
    const average = totalPayout / data.length;
    const latest = sortedByDate[0];

    return {
      total: totalPayout,
      average,
      latest,
      count: data.length,
    };
  }, [data]);

  if (!statistics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card
        className="hover:shadow-md transition-shadow cursor-default"
        onMouseEnter={() => totalPayoutRef.current?.startAnimation()}
        onMouseLeave={() => totalPayoutRef.current?.stopAnimation()}
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <CircleDollarSignIcon ref={totalPayoutRef} size={24} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Tổng chi trả
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            ${statistics.total.toFixed(2)}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Tổng cổ tức nhận được</p>
        </CardContent>
      </Card>

      <Card
        className="hover:shadow-md transition-shadow cursor-default"
        onMouseEnter={() => averagePayoutRef.current?.startAnimation()}
        onMouseLeave={() => averagePayoutRef.current?.stopAnimation()}
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl text-green-600">
              <TrendingUpIcon ref={averagePayoutRef} size={24} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Chi trả trung bình
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            ${statistics.average.toFixed(2)}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Trên mỗi lần chi trả</p>
        </CardContent>
      </Card>

      <Card
        className="hover:shadow-md transition-shadow cursor-default"
        onMouseEnter={() => latestPayoutRef.current?.startAnimation()}
        onMouseLeave={() => latestPayoutRef.current?.stopAnimation()}
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
              <CalendarDaysIcon ref={latestPayoutRef} size={24} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Chi trả gần nhất
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            ${statistics.latest.cash_amount.toFixed(2)}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {format(new Date(statistics.latest.pay_date), "dd/MM/yyyy")}
          </p>
        </CardContent>
      </Card>

      <Card
        className="hover:shadow-md transition-shadow cursor-default"
        onMouseEnter={() => eventsRef.current?.startAnimation()}
        onMouseLeave={() => eventsRef.current?.stopAnimation()}
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
              <ActivityIcon ref={eventsRef} size={24} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Số lần nhận
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            {statistics.count}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Tổng số lần nhận cổ tức</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockStats;
