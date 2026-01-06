import React from "react";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { getHoliday, getLunarMock, type Event } from "../../lib/calendar-utils";

interface LunarCalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  events: Event[];
}

export function LunarCalendar({ date, setDate, events }: LunarCalendarProps) {
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
              DayButton: ({
                day,
                modifiers,
                ...props
              }: React.ComponentProps<typeof CalendarDayButton>) => {
                const dayDate = day.date;
                const lunar = getLunarMock(dayDate);
                const holiday = getHoliday(dayDate);
                const hasEvent = events.some(
                  (e) =>
                    format(e.date, "yyyy-MM-dd") ===
                    format(dayDate, "yyyy-MM-dd")
                );

                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isToday = dayDate.getTime() === today.getTime();
                const isPast = dayDate < today;
                const isSelected = modifiers.selected === true;

                let containerClasses =
                  "bg-white text-zinc-900 shadow-sm border border-zinc-100 hover:border-primary/30 transition-all duration-300";

                if (isPast) {
                  containerClasses =
                    "bg-zinc-50/50 text-zinc-400 opacity-60 grayscale border-transparent shadow-none";
                } else if (isToday) {
                  // Using user requested colors
                  containerClasses =
                    "!bg-[#FFEACE] !text-black ring-2 ring-[#FFEACE] ring-offset-2 z-10 shadow-md transform scale-[1.02]";
                } else if (isSelected) {
                  // Using user requested colors
                  containerClasses =
                    "!bg-[#E5E5E5] !text-black ring-2 ring-primary/20 z-10 shadow-sm";
                }

                return (
                  <CalendarDayButton
                    day={day}
                    modifiers={modifiers}
                    className={cn(
                      "rounded-xl min-h-[80px] relative overflow-hidden group p-0 m-0",
                      isPast && "pointer-events-none"
                    )}
                    {...props}
                  >
                    <div
                      className={cn(
                        "flex flex-col justify-between h-full w-full p-2 rounded-xl transition-all",
                        containerClasses
                      )}
                    >
                      {/* Top Row: Solar Date & Status Dot */}
                      <div className="flex justify-between items-start w-full">
                        <span
                          className={cn(
                            "text-lg font-bold leading-none tracking-tight",
                            holiday && !isPast ? "text-red-500" : ""
                          )}
                        >
                          {format(dayDate, "d")}
                        </span>

                        <div className="flex gap-1">
                          {hasEvent && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm" />
                          )}
                          {lunar.isAuspicious && !isPast && (
                            <div
                              className="w-2 h-2 rounded-full bg-yellow-400 shadow-sm"
                              title="Hoàng đạo"
                            />
                          )}
                        </div>
                      </div>

                      {/* Middle: Holiday (if any) */}
                      {holiday && !isPast && (
                        <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 px-1">
                          <span className="block text-[9px] text-center font-bold text-red-500 uppercase tracking-wider truncate bg-red-50/80 rounded py-0.5">
                            {holiday}
                          </span>
                        </div>
                      )}

                      {/* Bottom Row: Lunar Date */}
                      <div className="flex justify-end w-full mt-auto">
                        <span
                          className={cn(
                            "text-[10px] font-medium opacity-60",
                            isToday || isSelected
                              ? "opacity-80"
                              : "text-zinc-500"
                          )}
                        >
                          {lunar.day}/{lunar.month}
                        </span>
                      </div>
                    </div>
                  </CalendarDayButton>
                );
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Legend / Info Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-card/80 border rounded-2xl shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
          <div className="flex flex-col">
            <span className="text-xs font-bold">Hoàng đạo</span>
            <span className="text-[10px] text-muted-foreground">Ngày tốt</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="w-3 h-3 rounded-full bg-gray-500" />
          <div className="flex flex-col">
            <span className="text-xs font-bold">Hắc đạo</span>
            <span className="text-[10px] text-muted-foreground">Ngày xấu</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold">Sự kiện</span>
            <span className="text-[10px] text-muted-foreground">
              Có lịch hẹn
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <span className="text-destructive font-black text-lg w-3 flex justify-center">
            1
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-destructive">Ngày lễ</span>
            <span className="text-[10px] text-muted-foreground">Việt Nam</span>
          </div>
        </div>
      </div>
    </div>
  );
}
