import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/stores/root.store";
import { fetchCategoriesNews, setLoading } from "@/stores/news.store";
import { BounceLoading } from "respinner";
import CategoryArticle from "@/components/custom/CategoryItem";

const Category = () => {
  const { category } = useParams<{ category: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const { feed, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(setLoading(true));
    const currentCategory = category || "trangchu24h";
    setTimeout(() => {
      dispatch(fetchCategoriesNews(currentCategory));
    }, 500);
  }, [category, dispatch]);

  if (loading || (!feed && !error)) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] spinners">
        <BounceLoading color="#111111" gap={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>Error loading news: {error}</p>
      </div>
    );
  }

  if (!feed) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4 mb-4">
          {feed.image?.url && (
            <img
              src={feed.image.url}
              alt={feed.image.title || feed.title}
              className="h-16 w-auto object-contain"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{feed.title}</h1>
            <p className="text-gray-600 mt-1">{feed.description}</p>
          </div>
        </div>
        {feed.pubDate && (
          <p className="text-sm text-gray-500">Last updated: {feed.pubDate}</p>
        )}
      </div>
      {/* Display category news */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feed.items.map((item, index) => {
          return (
            <CategoryArticle
              category={category || "trangchu24h"}
              key={index}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
