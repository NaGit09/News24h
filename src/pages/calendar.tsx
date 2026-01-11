import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { type Event } from "@/lib/calendar-utils";
import { LunarCalendar } from "@/components/calendar/LunarCalendar";
import { DayDetailPanel } from "@/components/calendar/DayDetailPanel";
import { homeCategoryBlocks } from "@/constant/home-data";
import { CategoryBlock } from "@/components/sections/category-block";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Họp team dự án",
      time: "09:00",
      date: new Date(),
    },
  ]);

  const handleAddEvent = (title: string, time: string) => {
    if (!date || !title) return;

    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: title,
      time: time,
      date: date,
    };

    setEvents([...events, newEvent]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const selectedDateEvents = events.filter(
    (e) => date && format(e.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

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
        {(() => {
          const newsBlock =
            homeCategoryBlocks.find((b) => b.category === "Giải trí") ||
            homeCategoryBlocks.find((b) => b.category === "Tin tức");
          if (newsBlock) {
            return <CategoryBlock {...newsBlock} />;
          }
          return null;
        })()}
      </div>
    </div>
  );
}
