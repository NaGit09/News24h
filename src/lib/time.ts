/**
 * Format a date string to relative time (e.g., "2 phút trước", "3 giờ trước")
 * @param dateString - ISO date string or any valid date format
 * @returns Formatted relative time string in Vietnamese
 */
export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString;
  }

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Future date
  if (diffInSeconds < 0) {
    return "Vừa xong";
  }

  // Less than 1 minute
  if (diffInSeconds < 60) {
    return "Vừa xong";
  }

  // Less than 1 hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  }

  // Less than 1 day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  }

  // Less than 1 week
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  }

  // Less than 1 month
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} tuần trước`;
  }

  // Less than 1 year
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} tháng trước`;
  }

  // More than 1 year
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} năm trước`;
}
