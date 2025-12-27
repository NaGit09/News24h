import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchNews } from "@/stores/news.store";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/root.store";
import type { AppDispatch } from "@/stores/root.store";

const News = () => {
  const { newsInfo } = useParams<{
    newsInfo: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!newsInfo) return;
    dispatch(fetchNews(newsInfo));
  }, [newsInfo, dispatch]);
  const { news, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {news && (
        <div>
          <h1>{news.title}</h1>

          <p>{news.description}</p>
          <p>{news.publishedAt}</p>
          <p>{news.author}</p>
          <div dangerouslySetInnerHTML={{ __html: news.contentHtml }} />
        </div>
      )}
    </div>
  );
};

export default News;
