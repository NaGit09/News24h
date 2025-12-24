import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/stores/root.store";
import { fetchCategoriesNews } from "@/stores/news.store";

const Category = () => {
  const { category } = useParams<{ category: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const { feed, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    const currentCategory = category || "tin-moi-nhat";
    dispatch(fetchCategoriesNews(currentCategory));
  }, [category, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feed.items.map((item, index) => (
          <article
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 hover:text-blue-600">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h2>

              <div className="text-xs text-gray-500 mb-4 flex items-center justify-between">
                <span>
                  {item.pubDate
                    ? new Date(item.pubDate).toLocaleDateString()
                    : ""}
                </span>
              </div>

              <div
                className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow prose prose-sm"
                dangerouslySetInnerHTML={{
                  __html: item.description
                    ? item.description.replace(/<img[^>]*>/g, "")
                    : "",
                }}
              />

              <div className="pt-4 mt-auto border-t border-gray-100">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1"
                  change-detection-ignore="true"
                >
                  Read full story
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Category;
