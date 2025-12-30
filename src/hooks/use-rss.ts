import { useState, useEffect } from 'react';
import { fetchAllNews, fetchFeed } from '@/services/news.service';
import type { Article } from '@/types/news';
import { CATEGORY_URL_MAP } from '@/constant/categories';

export function useRSSFeeds() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadFeeds() {
      try {
        setLoading(true);
        const data = await fetchAllNews();
        
        if (mounted) {
          setArticles(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadFeeds();

    // Refresh every 5 minutes
    const interval = setInterval(loadFeeds, 5 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { articles, loading, error };
}

export function useRSSByCategory(category: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const categoryUrl = CATEGORY_URL_MAP[category];

  useEffect(() => {
    if (!categoryUrl) {
      setError(new Error(`Không tìm thấy category: ${category}`));
      setLoading(false);
      return;
    }

    let mounted = true;

    async function loadFeeds() {
      try {
        setLoading(true);
        const feed = await fetchFeed(categoryUrl, category);
        
        if (mounted) {
          setArticles(feed?.articles || []);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadFeeds();

    // Refresh every 5 minutes
    const interval = setInterval(loadFeeds, 5 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [category, categoryUrl]);

  return { articles, loading, error };
}
