export function CalendarLegend() {
  return (
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
          <span className="text-[10px] text-muted-foreground">Có lịch hẹn</span>
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
  );
}
