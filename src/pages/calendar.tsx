import { CalendarDays } from "lucide-react";
import { LunarCalendar } from "@/components/calendar/lunar-calendar.tsx";
import { DayDetailPanel } from "@/components/calendar/day-detail-panel.tsx";
import { homeCategoryBlocks } from "@/constant/home-data";
import { CategoryBlock } from "@/components/sections/category-block";
import { useCalendar } from "@/hooks/use-calendar";
import { useMemo } from "react";

export default function CalendarPage() {
  const {
    date,
    setDate,
    events,
    selectedDateEvents,
    handleAddEvent,
    handleDeleteEvent,
  } = useCalendar();
  
  const newsBlock = useMemo(() => {
    const newsBlock =
      homeCategoryBlocks.find((b) => b.category === "Giải trí") ||
      homeCategoryBlocks.find((b) => b.category === "Tin tức");
    if (newsBlock) {
      return <CategoryBlock {...newsBlock} />;
    }
    return null;
  }, [date]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <CalendarDays className="h-8 w-8" />
        </div>
        <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
          Lịch Vạn Niên
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Calendar */}
        <div className="lg:col-span-8">
          <LunarCalendar date={date} setDate={setDate} events={events} />
        </div>

        {/* Right Column: Events & Actions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <DayDetailPanel
            date={date}
            events={selectedDateEvents}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </div>
      </div>

      <div className="mt-12">
        {newsBlock}
      </div>
    </div>
  );
}
