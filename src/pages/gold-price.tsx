import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GoldDataResult } from "@/types/gold-price";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { getGoldenPrice } from "@/services/gold-price.service";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function GoldPricePage() {
  const [data, setData] = useState<GoldDataResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getGoldenPrice();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch gold prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { chartData, chartConfig } = useMemo(() => {
    if (!data?.prices) return { chartData: [], chartConfig: {} };

    // Get list of brands for filtering logic
    let topBrands = data.prices;

    // Apply filter if selected
    if (selectedBrand !== "all") {
      topBrands = topBrands.filter(
        (_, idx) => idx.toString() === selectedBrand
      );
    } else {
      topBrands = topBrands.slice(0, 5); // Default show top 5 if "all"
    }

    // Create config
    const config: Record<string, { label: string; color: string }> = {};
    topBrands.forEach((item, index) => {
      // Maintain consistent colors even when filtered
      const colorIndex =
        selectedBrand === "all" ? index : parseInt(selectedBrand);

      config[`brand_${index}_sell`] = {
        label: `${item.name} (Bán)`,
        color: `var(--chart-${(colorIndex % 5) + 1})`,
      };
      config[`brand_${index}_buy`] = {
        label: `${item.name} (Mua)`,
        color: `var(--chart-${(colorIndex % 5) + 1})`,
      };
    });

    // Generate 30 days of fake data
    const days = 30;
    const historyData = [];
    const now = new Date();

    // Base prices for simulation
    const brandBasePrices = topBrands.map((brand) => ({
      buy: parseFloat(brand.buyToday.replace(/,/g, ".")) || 80,
      sell: parseFloat(brand.sellToday.replace(/,/g, ".")) || 82,
    }));

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split("T")[0];

      const dailyData: Record<string, string | number> = { date: dateString };

      brandBasePrices.forEach((base, index) => {
        // Simulate random walk
        const drift = i * 0.05;
        const noiseBuy = (Math.random() - 0.5) * 0.5;
        const noiseSell = (Math.random() - 0.5) * 0.5;

        dailyData[`brand_${index}_buy`] = parseFloat(
          (base.buy - drift + noiseBuy).toFixed(2)
        );
        dailyData[`brand_${index}_sell`] = parseFloat(
          (base.sell - drift + noiseSell).toFixed(2)
        );
      });

      historyData.push(dailyData);
    }

    // Force exact match for last day (Today)
    const lastDay = historyData[historyData.length - 1];
    topBrands.forEach((item, index) => {
      lastDay[`brand_${index}_buy`] =
        parseFloat(item.buyToday.replace(/,/g, ".")) || 0;
      lastDay[`brand_${index}_sell`] =
        parseFloat(item.sellToday.replace(/,/g, ".")) || 0;
    });

    return {
      chartData: historyData,
      chartConfig: config,
    };
  }, [data, selectedBrand]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
          Giá vàng hôm nay
        </h1>
        <p className="text-sm text-muted-foreground">
          {data ? `Cập nhật: ${data.updateTime}` : "Đang cập nhật..."}
        </p>
      </div>

      {/* Price Chart */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Biểu đồ biến động giá 30 ngày (Dữ liệu mô phỏng)
            </CardTitle>
            <CardDescription>
              {data ? `Đơn vị: ${data.unit}` : "Đang tải..."}
            </CardDescription>
          </div>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn loại vàng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả (Top 5)</SelectItem>
              {data?.prices.map((item, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />
                <XAxis
                  dataKey="date"
                  className="text-xs"
                  tickMargin={10}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                  }}
                />
                <YAxis className="text-xs" domain={["auto", "auto"]} />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="dot"
                      formatter={(value, name) => (
                        <div className="flex min-w-[130px] items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex-1">{name}</span>
                          <span className="font-mono font-medium text-foreground">
                            {value}
                          </span>
                        </div>
                      )}
                    />
                  }
                />
                <Legend />
                {Object.keys(chartConfig).map((key) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={chartConfig[key].color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                    name={chartConfig[key].label}
                    strokeDasharray={key.includes("buy") ? "5 5" : undefined}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Price Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bảng giá vàng trực tuyến</CardTitle>
          <CardDescription>
            {data ? `Đơn vị: ${data.unit}` : "Đang tải dữ liệu..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-sm font-semibold text-foreground">
                      Loại vàng
                    </th>
                    <th className="pb-3 text-right text-sm font-semibold text-foreground">
                      Mua hôm nay
                    </th>
                    <th className="pb-3 text-right text-sm font-semibold text-foreground">
                      Bán hôm nay
                    </th>
                    <th className="pb-3 text-right text-sm font-semibold text-foreground">
                      Mua hôm qua
                    </th>
                    <th className="pb-3 text-right text-sm font-semibold text-foreground">
                      Bán hôm qua
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data?.prices.map((item, index) => (
                    <tr
                      key={index}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <td className="py-4 text-sm font-medium text-foreground">
                        {item.name}
                      </td>
                      <td className="py-4 text-right text-sm font-semibold text-foreground">
                        {item.buyToday}
                      </td>
                      <td className="py-4 text-right text-sm font-semibold text-foreground">
                        {item.sellToday}
                      </td>
                      <td className="py-4 text-right text-sm font-semibold text-foreground">
                        <div className="flex flex-col items-end gap-1">
                          <span>{item.buyYesterday}</span>
                          <span
                            className={`text-xs font-medium ${
                              item.change.startsWith("-")
                                ? "text-destructive"
                                : item.change === "0"
                                ? "text-muted-foreground"
                                : "text-accent"
                            }`}
                          >
                            {item.change}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-right text-sm font-semibold text-foreground">
                        {item.sellYesterday}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 rounded border border-border bg-muted/30 p-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Lưu ý:</strong> Giá vàng được
              cập nhật liên tục trong ngày và có thể thay đổi bất kỳ lúc nào.
              Giá trên chỉ mang tính chất tham khảo. Để biết giá chính xác nhất,
              vui lòng liên hệ trực tiếp với các doanh nghiệp.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
