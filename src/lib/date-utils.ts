/**
 * Format date safely, return fallback if invalid
 */
export const formatDate = (
  dateString: string | undefined,
  options?: Intl.DateTimeFormatOptions,
  fallback: string = "Không rõ"
): string => {
  if (!dateString) return fallback;
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return fallback;
    }
    
    return date.toLocaleString("vi-VN", options || {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return fallback;
  }
};

/**
 * Check if date string is valid
 */
export const isValidDate = (dateString: string | undefined): boolean => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
