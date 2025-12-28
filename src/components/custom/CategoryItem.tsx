import type { CategoryItem } from "@/types/rss";

interface CategoryArticleProps extends CategoryItem {
  category: string;
}

const CategoryArticle = ({
  title,
  link,
  pubDate,
  description,
  category,
}:
  CategoryArticleProps) => {
  
  const imgMatch = description?.match(/src=["']([^"']+)['"]/);
  const imageUrl = imgMatch ? imgMatch[1] : null;

  const cleanDescription = description
    ? description
        .replace(/<a[^>]*>\s*<img[^>]*>\s*<\/a>/gi, "")
        .replace(/<img[^>]*>/gi, "")
    : "";
  
  return (
    <a
      href={`/${category}/${link.split("/").pop()}`}
      rel="noopener noreferrer"
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all
     duration-300 border border-gray-100 overflow-hidden flex flex-col"
    >
      {imageUrl && (
        <div className="h-48 overflow-hidden relative group">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 
            transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 hover:text-blue-600">
          {title}
        </h2>

        <div className="text-xs text-gray-500 mb-4 flex items-center justify-between">
          <span>{pubDate ? new Date(pubDate).toLocaleDateString() : ""}</span>
        </div>

        <div
          className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow prose prose-sm"
          dangerouslySetInnerHTML={{
            __html: cleanDescription,
          }}
        />
      </div>
    </a>
  );
};

export default CategoryArticle;
