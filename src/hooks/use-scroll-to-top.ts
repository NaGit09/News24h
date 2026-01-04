import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Custom hook to scroll to top when route changes
 * Useful for maintaining consistent UX when navigating between pages
 */
export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);
}
