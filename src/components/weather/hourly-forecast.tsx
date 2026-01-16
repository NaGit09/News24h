import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { WeatherIcon } from "./weather-icon";
import type { WeatherData } from "@/types/weather";

interface HourlyForecastProps {
  data: WeatherData["hourly"];
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground">Dự báo hàng giờ</h3>
      </div>
      <Card className="border-0 shadow-md bg-white dark:bg-card">
        <CardContent className="p-6">
          <div className="flex justify-between md:justify-start md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
            {data.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-3 min-w-[70px] p-3 rounded-2xl hover:bg-muted/50 transition-colors cursor-default"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {item.time}
                </span>
                <WeatherIcon status={item.status} className="w-10 h-10" />
                <span className="text-lg font-bold text-foreground">
                  {item.temp}°
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
