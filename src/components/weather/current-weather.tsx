import { MapPin, Droplets, Wind, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";
import { WeatherIcon } from "./weather-icon";
import type { WeatherData } from "@/types/weather";

interface CurrentWeatherProps {
  data: WeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const isNight = !data.current.status;
  const isRainy = data.current.status.toLowerCase().includes("mưa");

  let bgGradient = "from-sky-400 to-blue-600";

  if (isNight) bgGradient = "from-slate-800 to-indigo-950";
    
  else if (isRainy) bgGradient = "from-slate-500 to-slate-700";
    
  else if (
    data.current.status === "Trời quang" ||
    data.current.status === "Chủ yếu là nắng"
  )
    bgGradient = "from-amber-400 to-orange-500";

  return (
    <div
      className={cn(
        "relative w-full py-12 px-4 overflow-hidden bg-linear-to-br text-white shadow-lg transition-all duration-500",
        bgGradient
      )}
    >
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
              <span className="text-xl font-bold">
                {data.current.temp + (data.current.humidity > 70 ? 2 : 0)}°
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
