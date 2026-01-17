import { useEffect, useState } from "react";

export const UserStatsBadge = () => {
  const [stats, setStats] = useState({ bookmarks: 0, history: 0 });

  useEffect(() => {
    const updateStats = () => {
      if (typeof window === "undefined") return;
      
      const bookmarks = localStorage.getItem("bookmarks");
      const history = localStorage.getItem("reading-history");
      
      setStats({
        bookmarks: bookmarks ? JSON.parse(bookmarks).length : 0,
        history: history ? JSON.parse(history).length : 0,
      });
    };

    updateStats();
    
    // Listen for storage changes
    window.addEventListener("storage", updateStats);
    
    // Custom event for same-tab updates
    window.addEventListener("bookmarkChange", updateStats);
    
    return () => {
      window.removeEventListener("storage", updateStats);
      window.removeEventListener("bookmarkChange", updateStats);
    };
  }, []);

  if (stats.bookmarks === 0 && stats.history === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
      {stats.bookmarks + stats.history > 9 ? "9+" : stats.bookmarks + stats.history}
    </span>
  );
};
