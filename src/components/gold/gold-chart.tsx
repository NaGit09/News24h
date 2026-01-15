import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, Printer, Menu } from "lucide-react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState, useRef } from "react";
import { handleDownload, handlePrint } from "@/lib/helper";
import { useGold } from "@/hooks/use-gold";
import NotData from "../common/not-data.tsx";

export default function GoldPriceChart() {
  const { chartData: data, brand } = useGold({ skipInit: true });
  const [visibleLines, setVisibleLines] = useState<string[]>(["buy", "sell"]);
  const chartRef = useRef<HTMLDivElement>(null);

  const toggleVisibility = (key: string) => {
    if (!key) return;
    setVisibleLines((prev) => {
      if (prev.includes(key) && prev.length === 1) {
        return ["buy", "sell"];
      }
      return prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];
    });
  };

  const handlePrintChart = () => {
    handlePrint(chartRef);
  };

  const handleDownloadChart = (type: "png" | "jpeg" | "pdf" | "svg") => {
    handleDownload(type, brand, chartRef);
  };

  if (!data.length) {
    return (
      <NotData />
    );
  }

  return (
    <Card className="m-0 p-0 border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">
          Biểu đồ giá vàng 30 ngày gần nhất
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handlePrintChart}>
              <Printer className="mr-2 h-4 w-4" />
              In biểu đồ
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownloadChart("png")}>
              <Download className="mr-2 h-4 w-4" />
              Tải ảnh PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownloadChart("jpeg")}>
              <Download className="mr-2 h-4 w-4" />
              Tải ảnh JPEG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownloadChart("pdf")}>
              <Download className="mr-2 h-4 w-4" />
              Tải PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownloadChart("svg")}>
              <Download className="mr-2 h-4 w-4" />
              Tải SVG Vector
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <div ref={chartRef} className="w-full">
          <ChartContainer
            className="h-[350px] w-full"
            config={{
              buy: { label: "Mua vào", color: "hsl(142, 76%, 36%)" },
              sell: { label: "Bán ra", color: "hsl(0, 84%, 60%)" },
            }}
          >
            <LineChart data={data}>
              <CartesianGrid
                vertical={false}
                strokeDasharray="8 8"
                strokeWidth={2}
              />

              <XAxis
                dataKey="date"
                tickFormatter={(v) =>
                  new Date(v).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                  })
                }
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                domain={["dataMin - 1", "dataMax + 1"]}
              />

              <ChartTooltip content={<ChartTooltipContent />} />

              <Legend
                onClick={(e: any) => toggleVisibility(e.dataKey)}
                wrapperStyle={{ cursor: "pointer" }}
              />

              <Line
                dataKey="buy"
                stroke="hsl(142, 76%, 36%)"
                dot
                hide={!visibleLines.includes("buy")}
                onClick={() => toggleVisibility("buy")}
                activeDot={{
                  r: 6,
                  cursor: "pointer",
                  onClick: () => toggleVisibility("buy"),
                }}
                style={{ cursor: "pointer" }}
                strokeWidth={2}
              />
              <Line
                dataKey="sell"
                stroke="hsl(0, 84%, 60%)"
                dot
                hide={!visibleLines.includes("sell")}
                onClick={() => toggleVisibility("sell")}
                activeDot={{
                  r: 6,
                  cursor: "pointer",
                  onClick: () => toggleVisibility("sell"),
                }}
                style={{ cursor: "pointer" }}
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
