import { format } from "date-fns";

export interface Event {
    id: string;
    title: string;
    time: string;
    date: Date;
}

// Mock holidays
export const HOLIDAYS: Record<string, string> = {
    "01/01": "Tết Dương lịch",
    "30/04": "Giải phóng miền Nam",
    "01/05": "Quốc tế Lao động",
    "02/09": "Quốc khánh",
};

export const getHoliday = (day: Date) => {
    const key = format(day, "dd/MM");
    return HOLIDAYS[key];
};

// Mock Lunar & Auspicious Logic
// In a real app, use a library like 'lunisolar' or 'vietnamese-lunar-calendar'
export const getLunarMock = (date: Date) => {
    // Mock logic: Lunar date is roughly ~1 month behind solar, just subtracting ~30 days for demo
    const mockLunar = new Date(date);
    mockLunar.setDate(date.getDate() - 29);

    // Randomly deterministic auspicious status based on date
    const daySum = date.getDate() + date.getMonth();
    const isAuspicious = daySum % 3 === 0;
    const isInauspicious = daySum % 4 === 0 && !isAuspicious;

    return {
        day: mockLunar.getDate(),
        month: mockLunar.getMonth() + 1,
        isAuspicious, // Hoàng đạo
        isInauspicious, // Hắc đạo
    };
};
