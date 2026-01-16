import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

import { Card, CardContent } from "@/components/ui/card";
import { vi } from "date-fns/locale";
import { type Event } from "../../lib/calendar-utils";
import { getHoliday } from "@/services/calendar.service";
import type { Holiday } from "@/types/calendar";
import { CalendarDay } from "./calendar-day";
import { CalendarLegend } from "./calendar-legend";

interface LunarCalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  events: Event[];
}

export function LunarCalendar({ date, setDate, events }: LunarCalendarProps) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const currentYear = date?.getFullYear() || new Date().getFullYear();

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const data = await getHoliday("vn", currentYear);
        if (data?.response?.holidays) {
          setHolidays(data.response.holidays);
        }
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      }
    };
    fetchHolidays();
  }, [currentYear]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-none shadow-2xl bg-card overflow-hidden transition-all hover:shadow-3xl ring-1 ring-border/50">
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={vi}
            className="w-full p-4 [&_.rdp-month]:w-full [&_.rdp-table]:w-full [&_.rdp-day]:h-auto [&_.rdp-day]:w-full [&_.rdp-day_button]:h-full [&_.rdp-day_button]:w-full [&_.rdp-day_button]:p-1 [&_.rdp-cell]:border-none [&_.rdp-head_cell]:text-muted-foreground [&_.rdp-head_cell]:font-medium [&_.rdp-head_cell]:pb-4"
            components={{
              DayButton: (props) => (
                <CalendarDay {...props} holidays={holidays} events={events} />
              ),
            }}
          />
        </CardContent>
      </Card>

      <CalendarLegend />
    </div>
  );
}
