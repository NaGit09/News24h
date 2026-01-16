import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { WeatherIcon } from "./weather-icon";
import type { WeatherData } from "@/types/weather";

interface WeeklyForecastProps {
  data: WeatherData["weekly"];
}

export default function WeeklyForecast({ data }: WeeklyForecastProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground">7 ngày tới</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item, idx) => (
          <Card
            key={idx}
            className="border-0 shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4 w-1/3">
                <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <WeatherIcon status={item.status} className="w-6 h-6" />
                </div>
                <span className="font-semibold text-foreground capitalize truncate">
                  {item.day}
                </span>
              </div>

              {/* Temperature Bar Visualization (Simplified) */}
              <div className="flex-1 px-4 hidden sm:flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-6 text-right">
                  {item.tempLow}°
                </span>
                <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden relative">
                  <div
                    className="absolute h-full rounded-full bg-linear-to-r from-blue-400 to-amber-400 opacity-80"
                    style={{
                      left: "20%",
                      right: "20%",
                    }}
                  />
                </div>
                <span className="text-xs text-foreground font-medium w-6">
                  {item.tempHigh}°
                </span>
              </div>

              {/* Mobile View Temp */}
              <div className="flex sm:hidden flex-col items-end">
                <span className="font-bold">{item.tempHigh}°</span>
                <span className="text-xs text-muted-foreground">
                  {item.tempLow}°
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
