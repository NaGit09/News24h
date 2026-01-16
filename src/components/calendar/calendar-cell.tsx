import React from "react";
import { CalendarDayButton } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format, isPast, isToday } from "date-fns";

export const CalendarCell = ({
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof CalendarDayButton>) => {

    

  const today = new Date();
  today.setHours(0, 0, 0, 0);


  let containerClasses =
    "bg-white text-zinc-900 shadow-sm border border-zinc-100 hover:border-primary/30 transition-all duration-300";
  if (isPast(day.date)) {
    containerClasses =
      "bg-zinc-50/50 text-zinc-400 opacity-60 grayscale border-transparent shadow-none";
  } else if (isToday(day.date)) {
    // Using user requested colors
    containerClasses =
      "!bg-[#FFEACE] !text-black ring-2 ring-[#FFEACE] ring-offset-2 z-10 shadow-md transform scale-[1.02]";
  } else if (modifiers.selected) {
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
        isPast(day.date) && "pointer-events-none"
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
              modifiers.selected ? "text-red-500" : ""
            )}
          >
            {format(day.date, "d")}
          </span>

          <div className="flex gap-1">
            {modifiers.selected && (
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm" />
            )}
            {modifiers.selected && (
              <div
                className="w-2 h-2 rounded-full bg-yellow-400 shadow-sm"
                title="Hoàng đạo"
              />
            )}
          </div>
        </div>

        {/* Middle: Holiday (if any) */}
        {modifiers.selected && (
          <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 px-1">
            <span className="block text-[9px] text-center font-bold text-red-500 uppercase tracking-wider truncate bg-red-50/80 rounded py-0.5">
              {props.title}
            </span>
          </div>
        )}

        {/* Bottom Row: Lunar Date */}
        <div className="flex justify-end w-full mt-auto">
          <span
            className={cn(
              "text-[10px] font-medium opacity-60",
              modifiers.selected ? "opacity-80" : "text-zinc-500"
            )}
          >
            {format(day.date, "d")}/{format(day.date, "M")}
          </span>
        </div>
      </div>
    </CalendarDayButton>
  );
};
