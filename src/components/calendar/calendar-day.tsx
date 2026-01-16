import { cn } from "@/lib/utils";
import { CalendarDayButton } from "@/components/ui/calendar";
import { format } from "date-fns";
import { getLunarMock, type Event } from "@/lib/calendar-utils";
import type { Holiday } from "@/types/calendar";

interface CalendarDayProps
  extends React.ComponentProps<typeof CalendarDayButton> {
  holidays: Holiday[];
  events: Event[];
}

export function CalendarDay({
  day,
  modifiers,
  holidays,
  events,
  ...props
}: CalendarDayProps) {

    const dayDate = day.date;
    
    const lunar = getLunarMock(dayDate);
    
    const holiday = holidays.find(
      (h) => h.date.iso === format(dayDate, "yyyy-MM-dd")
    )?.name;
    
    const hasEvent = events.some(
      (e) => format(e.date, "yyyy-MM-dd") === format(dayDate, "yyyy-MM-dd")
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
              isToday || isSelected ? "opacity-80" : "text-zinc-500"
            )}
          >
            {lunar.day}/{lunar.month}
          </span>
        </div>
      </div>
    </CalendarDayButton>
  );
}
