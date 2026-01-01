import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullArticle } from "@/services/news.service";
import {
  setCurrentArticle,
  setLoading,
  setError,
  clearCurrentArticle,
} from "@/stores/article.store";
import type { RootState } from "@/stores/root.store";

export function useArticle(articleUrl: string | undefined) {

  const dispatch = useDispatch();
  
  const { currentArticle, loading, error } = useSelector(
    (state: RootState) => state.article
  );

  useEffect(() => {
    if (!articleUrl) {
      dispatch(setLoading(false));
      return;
    }

    const loadArticle = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        dispatch(clearCurrentArticle());

        const data = await getFullArticle(articleUrl);

        if (data) {
          dispatch(setCurrentArticle(data));
        } else {
          dispatch(setError("Không thể tải nội dung bài viết"));
        }
      } catch (err) {
        dispatch(setError("Đã xảy ra lỗi khi tải bài viết"));
        console.error("Error fetching article:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadArticle();

    return () => {
      dispatch(clearCurrentArticle());
      dispatch(setError(null));
    };
  }, [articleUrl, dispatch]);

  return { article: currentArticle, loading, error };
}
