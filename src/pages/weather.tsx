import { homeCategoryBlocks } from "@/constant/home-data";
import { CategoryBlock } from "@/components/sections/category-block";
import NotFound from "./not-found";
import LoadingSpinner from "@/components/common/loading-spinner.tsx";
import { useWeather } from "@/hooks/use-weather";
import { lazy, useMemo } from "react";
import Splitting from "@/components/common/splitting.tsx";

const CurrentWeather = lazy(() => import('@/components/weather/current-weather'));
const HourlyForecast = lazy(() => import('@/components/weather/hourly-forecast'));
const WeeklyForecast = lazy(() => import('@/components/weather/weekly-forecast'));

export default function WeatherPage() {
  const { loading, error, data } = useWeather();

  const heathNews = useMemo(() => {
    const healthNews = homeCategoryBlocks.find(
      (b) => b.category === "Sức khỏe"
    );
    if (healthNews) {
      return <CategoryBlock {...healthNews} />;
    }
    return null;
  }, []);
  
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-12">
      <Splitting> 
        <CurrentWeather data={data} />
      </Splitting>

      <div className="container mx-auto max-w-5xl px-4 mt-8 space-y-8">
        <Splitting>
          <HourlyForecast data={data.hourly} />
          <WeeklyForecast data={data.weekly} />
        </Splitting>
      </div>

      <div className="container mx-auto max-w-5xl px-4 pb-8">{heathNews}</div>
    </div>
  );
}
