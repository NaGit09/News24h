import { useEffect, useState } from "react";

interface ViewData {
  slug: string;
  count: number;
  lastViewed: string;
}

const STORAGE_KEY = "article_views";

/**
 * Custom hook to track and retrieve article view counts
 * Stores view data in localStorage
 */
export function useViewCounter(slug: string) {
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    if (!slug) return;

    const views = getViewsFromStorage();
    const existingView = views.find((v) => v.slug === slug);

    if (existingView) {
      // Increment view count
      existingView.count += 1;
      existingView.lastViewed = new Date().toISOString();
      setViewCount(existingView.count);
    } else {
      // First view
      views.push({
        slug,
        count: 1,
        lastViewed: new Date().toISOString(),
      });
      setViewCount(1);
    }

    saveViewsToStorage(views);
  }, [slug]);

  return viewCount;
}

/**
 * Get all view data from localStorage
 */
function getViewsFromStorage(): ViewData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Save view data to localStorage (keep last 100 articles)
 */
function saveViewsToStorage(views: ViewData[]) {
  try {
    // Sort by last viewed and keep only last 100
    const sorted = views
      .sort((a, b) => new Date(b.lastViewed).getTime() - new Date(a.lastViewed).getTime())
      .slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
  } catch (error) {
    console.error("Failed to save view data:", error);
  }
}

/**
 * Get view count for a specific article
 */
export function getArticleViewCount(slug: string): number {
  const views = getViewsFromStorage();
  const view = views.find((v) => v.slug === slug);
  return view ? view.count : 0;
}
