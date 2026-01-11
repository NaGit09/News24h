import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import PriceChangeLabel from "./PriceChangeLabel";
import { useGold } from "@/hooks/use-gold";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export function GoldTodayYesterdayTable() {
  const { tableData, brand, brands, currentDate, updateBrand, updateDate } =
    useGold({ skipInit: true });

  const date = new Date(currentDate);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Helper to safely format date
  const formatDateSafe = (d: Date | string | number) => {
    try {
      return format(new Date(d), "dd/MM/yyyy");
    } catch (e) {
      return "";
    }
  };

  const todayDate = formatDateSafe(date);
  const yesterdayDate = formatDateSafe(
    new Date(date).setDate(date.getDate() - 1)
  );

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      updateDate(format(selectedDate, "yyyy-MM-dd"));
      setIsPopoverOpen(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="filter flex justify-between mb-4 gap-4">
        {/* Filter by brand */}
        <Select value={brand} onValueChange={(val) => updateBrand(val)}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Tìm mã vàng nhanh" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Filter by date */}
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "flex-1 justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelectDate}
              required
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* Data table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead />
                <TableHead colSpan={2} className="text-center">
                  Hôm nay ({todayDate})
                </TableHead>
                <TableHead colSpan={2} className="text-center">
                  Hôm qua ({yesterdayDate})
                </TableHead>
              </TableRow>

              <TableRow className="bg-muted">
                <TableHead>Nhãn</TableHead>
                <TableHead>Giá mua</TableHead>
                <TableHead>Giá bán</TableHead>
                <TableHead>Giá mua</TableHead>
                <TableHead>Giá bán</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tableData.map((item) => (
                <TableRow
                  key={item.brand}
                  className={cn(
                    "cursor-pointer hover:bg-muted/50 transition-colors",
                    brand === item.brand &&
                      "bg-muted/50 border-l-4 border-primary"
                  )}
                  onClick={() => updateBrand(item.brand)}
                >
                  <TableCell className="font-medium">{item.brand}</TableCell>

                  <TableCell>
                    {item.today?.buy.toLocaleString()}
                    <PriceChangeLabel
                      today={item.today?.buy}
                      yesterday={item.yesterday?.buy}
                    />
                  </TableCell>

                  <TableCell>
                    {item.today?.sell.toLocaleString()}
                    <PriceChangeLabel
                      today={item.today?.sell}
                      yesterday={item.yesterday?.sell}
                    />
                  </TableCell>

                  <TableCell>{item.yesterday?.buy.toLocaleString()}</TableCell>

                  <TableCell>{item.yesterday?.sell.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
