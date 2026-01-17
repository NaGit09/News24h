import { useState, useEffect } from "react";

export interface BookmarkedArticle {
  slug: string;
  title: string;
  category: string;
  image?: string;
  description?: string;
  bookmarkedAt: string;
}

export function useBookmark() {
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);

  useEffect(() => {
    loadBookmarks();
    
    // Listen for bookmark changes
    const handleBookmarkChange = () => {
      loadBookmarks();
    };
    
    window.addEventListener("bookmarkChange", handleBookmarkChange);
    window.addEventListener("storage", handleBookmarkChange);
    
    return () => {
      window.removeEventListener("bookmarkChange", handleBookmarkChange);
      window.removeEventListener("storage", handleBookmarkChange);
    };
  }, []);

  const loadBookmarks = () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("bookmarks");
    if (!saved) {
      setBookmarks([]);
      return;
    }
    
    try {
      const parsed = JSON.parse(saved);
      // Simple validation: filter out invalid items
      const valid = parsed.filter((item: any) => 
        item && 
        item.slug && 
        item.slug !== "" && 
        item.slug !== "undefined" &&
        item.title &&
        item.category
      );
      setBookmarks(valid);
    } catch (err) {
      console.error("Error loading bookmarks:", err);
      setBookmarks([]);
    }
  };

  const addBookmark = (article: Omit<BookmarkedArticle, "bookmarkedAt">) => {
    const newBookmark: BookmarkedArticle = {
      ...article,
      bookmarkedAt: new Date().toISOString(),
    };

    const saved = localStorage.getItem("bookmarks");
    const currentBookmarks = saved ? JSON.parse(saved) : [];
    const filtered = currentBookmarks.filter((b: BookmarkedArticle) => b.slug !== article.slug);
    const updated = [newBookmark, ...filtered];
    
    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setBookmarks(updated);
    window.dispatchEvent(new Event("bookmarkChange"));
  };

  const removeBookmark = (slug: string) => {
    const saved = localStorage.getItem("bookmarks");
    const currentBookmarks = saved ? JSON.parse(saved) : [];
    const updated = currentBookmarks.filter((b: BookmarkedArticle) => b.slug !== slug);
    
    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setBookmarks(updated);
    window.dispatchEvent(new Event("bookmarkChange"));
  };

  const isBookmarked = (slug: string) => {
    return bookmarks.some((b) => b.slug === slug);
  };

  const toggleBookmark = (article: Omit<BookmarkedArticle, "bookmarkedAt">) => {
    if (isBookmarked(article.slug)) {
      removeBookmark(article.slug);
    } else {
      addBookmark(article);
    }
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
  };
}
