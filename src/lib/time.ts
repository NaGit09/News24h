/**
 * Calculate estimated reading time based on text content
 * @param text - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 words per minute)
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): number {
  if (!text) return 0;

  // Remove HTML tags
  const plainText = text.replace(/<[^>]*>/g, "");

  // Count words (split by whitespace and filter empty strings)
  const wordCount = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Calculate reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return readingTime;
}

/**
 * Format reading time to Vietnamese string
 * @param minutes - Reading time in minutes
 * @returns Formatted reading time string
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return "< 1 phút đọc";
  if (minutes === 1) return "1 phút đọc";
  return `${minutes} phút đọc`;
}

/**
 * Format a date string to "HH:mm DD/MM/YYYY"
 * @param dateInput - Date string or Date object
 * @returns Formatted date string
 */
export function formatDate(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    // Try to handle "YYYY-MM-DD HH:mm:ss" format if simple Date parsing failed
    if (typeof dateInput === "string" && dateInput.includes(" ")) {
      const fixed = dateInput.replace(" ", "T");
      const d2 = new Date(fixed);
      if (!isNaN(d2.getTime())) {
        const hours = d2.getHours().toString().padStart(2, "0");
        const minutes = d2.getMinutes().toString().padStart(2, "0");
        const day = d2.getDate().toString().padStart(2, "0");
        const month = (d2.getMonth() + 1).toString().padStart(2, "0");
        const year = d2.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
      }
    }
    return typeof dateInput === "string" ? dateInput : "";
  }

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`; // Format: HH:mm day/month/year
}

/**
 * Format a date string to "posted X days ago"
 * @param dateString - ISO date string or "HH:mm DD/MM/YYYY"
 * @returns Formatted relative time string
 */
export function formatRelativeTime(dateString: string): string {
  let date: Date;

  // Try to parse "HH:mm DD/MM/YYYY" format
  if (
    typeof dateString === "string" &&
    dateString.includes(" ") &&
    dateString.includes("/")
  ) {
    const [time, datePart] = dateString.split(" ");
    const [hours, minutes] = time.split(":");
    const [day, month, year] = datePart.split("/");

    date = new Date(
      parseInt(year),
      parseInt(month)-1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );
  } else {
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
    return dateString;
  }

  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const postedDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes()
  );

  const diffTime = Math.abs(today.getTime() - postedDay.getTime())/(60*1000);
  console.log(diffTime);

  if (diffTime < 60) {
    return `Vừa đăng ${Math.floor(diffTime)} phút trước`;
  }

  if (diffTime < 60 * 60) {
    return `${Math.floor(diffTime / 60)} phút trước`;
  }

  if (diffTime < 60 * 60 * 24) {
    return `Hôm qua vào lúc ${formatDate(date)}`;
  }

  if (diffTime < 60 * 60 * 24 * 30 * 1000) {
    return `${Math.floor(diffTime / (60 * 60 * 24))} ngày trước`;
  }

  if (diffTime < 60 * 60 * 24 * 365) {
    return `${Math.floor(diffTime / (60 * 60 * 24 * 30))} tháng trước`;
  }

  return `${Math.floor(diffTime / (60 * 60 * 24 * 365 * 2))} năm trước`;
}
