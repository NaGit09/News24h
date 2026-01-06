import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Check, Clock, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getLunarMock, type Event } from "../../lib/calendar-utils";

interface DayDetailPanelProps {
  date: Date | undefined;
  events: Event[];
  onAddEvent: (title: string, time: string) => void;
  onDeleteEvent: (id: string) => void;
}

export function DayDetailPanel({
  date,
  events,
  onAddEvent,
  onDeleteEvent,
}: DayDetailPanelProps) {

  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventTime, setNewEventTime] = useState("09:00");
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    setNewEventTitle("");
    setNewEventTime("09:00");
  }, [date]);

  const handleSave = () => {
    if (!date || !newEventTitle) return;
    onAddEvent(newEventTitle, newEventTime);
    setNewEventTitle("");
    setNewEventTime("09:00");
  };

  return (
    <Card className="h-full border-none shadow-xl bg-linear-to-br from-background to-muted/50 backdrop-blur-sm transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex flex-col gap-1">
          <span className="text-sm font-medium text-primary tracking-wider uppercase opacity-80">
            Chi tiết ngày
          </span>
          {date && (
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
              {format(date, "EEEE, d 'tháng' M, yyyy", { locale: vi })}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Date Info Detailed */}
        {date &&
          (() => {
            const lunar = getLunarMock(date);
            return (
              <div className="relative overflow-hidden rounded-xl border bg-card/50 p-6 shadow-sm transition-all hover:shadow-md">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-50" />
                <div className="relative space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">
                      Âm lịch
                    </span>
                    <span className="text-xl font-bold text-foreground">
                      {lunar.day}/{lunar.month}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        Giờ hoàng đạo
                      </span>
                      <p className="text-sm font-medium leading-tight">
                        Tý, Dần, Mão, Ngọ, Mùi, Dậu
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        Trực
                      </span>
                      <p className="text-sm font-medium leading-tight">
                        Kiến (Tốt xuất hành)
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    {lunar.isAuspicious ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-bold">
                          Nguyên Cát (Tốt)
                        </span>
                      </div>
                    ) : lunar.isInauspicious ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-500/10 text-gray-600 border border-gray-500/20">
                        <X className="w-4 h-4" />
                        <span className="text-sm font-bold">Hắc Đạo (Xấu)</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground font-medium px-3 py-1.5 bg-muted rounded-full">
                        Ngày thường
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

        {/* Event List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Sự kiện ({events.length})
            </h4>
          </div>
          <ScrollArea className="h-[240px] pr-4 -mr-4">
            {events.length > 0 ? (
              <div className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    onMouseEnter={() => setIsHovered(event.id)}
                    onMouseLeave={() => setIsHovered(null)}
                    className={cn(
                      "group flex items-center justify-between p-4 rounded-xl border bg-card/60 transition-all duration-200",
                      "hover:shadow-md hover:border-primary/20 hover:bg-card/90"
                    )}
                  >
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-medium bg-muted px-1.5 py-0.5 rounded text-[10px]">
                          {event.time}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteEvent(event.id)}
                      className={cn(
                        "opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                        isHovered === event.id && "opacity-100"
                      )}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3 opacity-60">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Clock className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Chưa có sự kiện nào
                </p>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Add Event Form */}
        <div className="pt-6 border-t border-border/40 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground ml-1">
                Nội dung
              </Label>
              <Input
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Nhập việc cần làm..."
                className="bg-background/50 focus:bg-background transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground ml-1">
                Giờ
              </Label>
              <Input
                type="time"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                className="bg-background/50 focus:bg-background transition-colors cursor-pointer"
              />
            </div>
          </div>
          <Button
            className="w-full font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
            onClick={handleSave}
            disabled={!date || !newEventTitle}
          >
            <Plus className="w-4 h-4 mr-2" /> Thêm Sự Kiện
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
