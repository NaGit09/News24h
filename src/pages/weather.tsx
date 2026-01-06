import { useEffect, useState } from "react";
import {
  CloudRain,
  Droplets,
  Wind,
  Sun,
  Cloud,
  Thermometer,
  CloudLightning,
  CloudSnow,
  CloudDrizzle,
  CloudFog,
  Loader2,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fetchWeatherData, type WeatherData } from "@/services/weather.service";
import { homeCategoryBlocks } from "@/constant/home-data";
import { CategoryBlock } from "@/components/sections/category-block";

// Enhanced Weather Icon with more vibrant colors and potential animations
const WeatherIcon = ({
  status,
  className,
  size = 24,
}: {
  status: string;
  className?: string;
  size?: number;
}) => {
  const iconProps = { size, strokeWidth: 1.5 };

  switch (status) {
    case "sun":
      return (
        <Sun
          {...iconProps}
          className={cn("text-amber-400 fill-amber-400/20", className)}
        />
      );
    case "cloud":
      return (
        <Cloud
          {...iconProps}
          className={cn("text-gray-400 fill-gray-400/20", className)}
        />
      );
    case "cloud-rain":
      return (
        <CloudRain
          {...iconProps}
          className={cn("text-blue-500 fill-blue-500/20", className)}
        />
      );
    case "cloud-drizzle":
      return (
        <CloudDrizzle
          {...iconProps}
          className={cn("text-blue-400 fill-blue-400/20", className)}
        />
      );
    case "cloud-lightning":
      return (
        <CloudLightning
          {...iconProps}
          className={cn("text-purple-500 fill-purple-500/20", className)}
        />
      );
    case "snowflake":
      return (
        <CloudSnow
          {...iconProps}
          className={cn("text-cyan-300 fill-cyan-300/20", className)}
        />
      );
    case "cloud-fog":
      return (
        <CloudFog
          {...iconProps}
          className={cn("text-slate-400 fill-slate-400/20", className)}
        />
      );
    default:
      return <Sun {...iconProps} className={cn("text-amber-400", className)} />;
  }
};

export default function WeatherPage() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        const result = await fetchWeatherData();
        setData(result);
      } catch (err) {
        setError("Không thể tải dữ liệu thời tiết");
      } finally {
        setLoading(false);
      }
    };
    loadWeather();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">
            Đang tải dữ liệu thời tiết...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center space-y-2">
          <CloudRain className="w-12 h-12 text-muted-foreground mx-auto" />
          <p className="text-destructive font-medium">
            {error || "Đã xảy ra lỗi"}
          </p>
        </div>
      </div>
    );
  }

  // Determine background gradient based on current weather code/status (simplified logic)
  const isNight = !data.current.isDay;
  const isRainy = data.current.status.toLowerCase().includes("mưa");

  let bgGradient = "from-sky-400 to-blue-600"; // Default nice blue
  if (isNight) bgGradient = "from-slate-800 to-indigo-950";
  else if (isRainy) bgGradient = "from-slate-500 to-slate-700";
  else if (
    data.current.status === "Trời quang" ||
    data.current.status === "Chủ yếu là nắng"
  )
    bgGradient = "from-amber-400 to-orange-500";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-12">
      {/* Hero Section with Weather Card */}
      <div
        className={cn(
          "relative w-full py-12 px-4 overflow-hidden bg-gradient-to-br text-white shadow-lg transition-all duration-500",
          bgGradient
        )}
      >
        {/* Abstract background blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-black/10 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 opacity-90 text-sm font-medium mb-1">
                <MapPin className="w-4 h-4" />
                <span>Hà Nội, Việt Nam</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {data.current.status}
              </h1>
              <p className="text-lg opacity-80 mt-2 max-w-lg">
                {data.current.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium opacity-90">
                {new Date().toLocaleDateString("vi-VN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-6">
              <div className="relative">
                <WeatherIcon
                  status={
                    data.current.status === "Trời quang" ||
                    data.current.status === "Chủ yếu là nắng"
                      ? "sun"
                      : data.current.status.includes("mưa")
                      ? "cloud-rain"
                      : "cloud"
                  }
                  className="w-32 h-32 md:w-40 md:h-40 text-white drop-shadow-lg"
                  size={160}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-7xl md:text-9xl font-bold tracking-tighter drop-shadow-md">
                  {data.current.temp}°
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:flex md:gap-8 gap-4 w-full md:w-auto p-6 bg-white/15 backdrop-blur-md rounded-3xl border border-white/20">
              <div className="flex flex-col items-center gap-1">
                <Droplets className="w-6 h-6 opacity-80" />
                <span className="text-sm opacity-70">Độ ẩm</span>
                <span className="text-xl font-bold">
                  {data.current.humidity}%
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Wind className="w-6 h-6 opacity-80" />
                <span className="text-sm opacity-70">Gió</span>
                <span className="text-xl font-bold">
                  {data.current.windSpeed}{" "}
                  <span className="text-xs font-normal">km/h</span>
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Thermometer className="w-6 h-6 opacity-80" />
                <span className="text-sm opacity-70">Cảm giác</span>
                {/* Using simple offset for feels like if not available */}
                <span className="text-xl font-bold">
                  {data.current.temp + (data.current.humidity > 70 ? 2 : 0)}°
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 mt-8 space-y-8">
        {/* Hourly Forecast */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">
              Dự báo hàng giờ
            </h3>
          </div>
          <Card className="border-0 shadow-md bg-white dark:bg-card">
            <CardContent className="p-6">
              <div className="flex justify-between md:justify-start md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
                {data.hourly.map((item, idx) => (
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

        {/* Weekly Forecast */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">7 ngày tới</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.weekly.map((item, idx) => (
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
                        className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 to-amber-400 opacity-80"
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
      </div>

      <div className="container mx-auto max-w-5xl px-4 pb-8">
        {(() => {
          const healthNews = homeCategoryBlocks.find(
            (b) => b.category === "Sức khỏe"
          );
          if (healthNews) {
            return <CategoryBlock {...healthNews} />;
          }
          return null;
        })()}
      </div>
    </div>
  );
}
