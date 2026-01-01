import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews, getNewsFeed } from "@/services/news.service";
import { CATEGORY_URL_MAP } from "@/constant/categories";
import { setArticles, setLoading, setError } from "@/stores/article.store";
import type { RootState } from "@/stores/root.store";

const TIMEOUT = 5 * 60 * 1000;

export function useRSSFeeds() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.article
  );

  useEffect(() => {
    let mounted = true;

    async function loadFeeds() {
      try {
        dispatch(setLoading(true));
        const data = await getAllNews();

        if (mounted) {
          dispatch(setArticles(data));
          dispatch(setError(null));
        }
      } catch (err) {
        if (mounted) {
          dispatch(
            setError(err instanceof Error ? err.message : "Unknown error")
          );
        }
      } finally {
        if (mounted) {
          dispatch(setLoading(false));
        }
      }
    }

    loadFeeds();
    const interval = setInterval(loadFeeds, TIMEOUT);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [dispatch]);

  return { articles, loading, error };
}

export function useRSSByCategory(category: string) {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.article
  );
  const categoryUrl = CATEGORY_URL_MAP[category];

  useEffect(() => {
    if (!categoryUrl) {
      dispatch(setError(`Không tìm thấy category: ${category}`));
      dispatch(setLoading(false));
      return;
    }

    let mounted = true;

    async function loadFeeds() {
      try {
        dispatch(setLoading(true));
        const feed = await getNewsFeed(category);

        if (mounted) {
          dispatch(setArticles(feed?.articles || []));
          dispatch(setError(null));
        }
      } catch (err) {
        if (mounted) {
          dispatch(
            setError(err instanceof Error ? err.message : "Unknown error")
          );
        }
      } finally {
        if (mounted) {
          dispatch(setLoading(false));
        }
      }
    }

    loadFeeds();
    const interval = setInterval(loadFeeds, TIMEOUT);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [category, categoryUrl, dispatch]);

  return { articles, loading, error: error ? new Error(error) : null };
}
