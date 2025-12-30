
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react"

const goldPriceData = [
  { date: "01/01", sjc: 76.5, doji: 76.3, pnj: 76.2 },
  { date: "05/01", sjc: 77.2, doji: 77.0, pnj: 76.9 },
  { date: "10/01", sjc: 78.5, doji: 78.2, pnj: 78.0 },
  { date: "15/01", sjc: 77.8, doji: 77.6, pnj: 77.5 },
  { date: "20/01", sjc: 79.2, doji: 79.0, pnj: 78.8 },
  { date: "25/01", sjc: 80.1, doji: 79.8, pnj: 79.7 },
  { date: "28/01", sjc: 81.5, doji: 81.2, pnj: 81.0 },
]

const providers = [
  { name: "SJC", buy: 81.2, sell: 81.5, change: 0.5, changePercent: 0.62 },
  { name: "DOJI", buy: 80.9, sell: 81.2, change: 0.4, changePercent: 0.49 },
  { name: "PNJ", buy: 80.7, sell: 81.0, change: 0.3, changePercent: 0.37 },
  { name: "Bảo Tín Minh Châu", buy: 80.8, sell: 81.1, change: 0.35, changePercent: 0.43 },
]

export default function GoldPricePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Giá vàng hôm nay</h1>
        <p className="text-sm text-muted-foreground">Cập nhật: 28/12/2024, 18:25 PM</p>
      </div>

      {/* Price Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Biểu đồ giá vàng 30 ngày
          </CardTitle>
          <CardDescription>Đơn vị: Triệu đồng/lượng</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              sjc: {
                label: "SJC",
                color: "hsl(var(--chart-1))",
              },
              doji: {
                label: "DOJI",
                color: "hsl(var(--chart-2))",
              },
              pnj: {
                label: "PNJ",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={goldPriceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" domain={[75, 82]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="sjc" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="doji" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="pnj" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Price Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bảng giá vàng các nhà cung cấp</CardTitle>
          <CardDescription>Giá mua bán vàng SJC tại các doanh nghiệp lớn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-semibold text-foreground">Doanh nghiệp</th>
                  <th className="pb-3 text-right text-sm font-semibold text-foreground">Mua vào</th>
                  <th className="pb-3 text-right text-sm font-semibold text-foreground">Bán ra</th>
                  <th className="pb-3 text-right text-sm font-semibold text-foreground">Thay đổi</th>
                  <th className="pb-3 text-right text-sm font-semibold text-foreground">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {providers.map((provider, index) => (
                  <tr key={index} className="transition-colors hover:bg-muted/30">
                    <td className="py-4 text-sm font-medium text-foreground">{provider.name}</td>
                    <td className="py-4 text-right text-sm font-semibold text-foreground">{provider.buy.toFixed(2)}</td>
                    <td className="py-4 text-right text-sm font-semibold text-foreground">
                      {provider.sell.toFixed(2)}
                    </td>
                    <td className="py-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 text-sm font-semibold ${
                          provider.change > 0 ? "text-accent" : "text-destructive"
                        }`}
                      >
                        {provider.change > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {Math.abs(provider.change).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <span
                        className={`text-sm font-semibold ${
                          provider.changePercent > 0 ? "text-accent" : "text-destructive"
                        }`}
                      >
                        {provider.changePercent > 0 ? "+" : ""}
                        {provider.changePercent.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded border border-border bg-muted/30 p-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Lưu ý:</strong> Giá vàng được cập nhật liên tục trong ngày và có thể
              thay đổi bất kỳ lúc nào. Giá trên chỉ mang tính chất tham khảo. Để biết giá chính xác nhất, vui lòng liên
              hệ trực tiếp với các doanh nghiệp.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


