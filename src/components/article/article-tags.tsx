import { Link } from "react-router";

interface ArticleTagsProps {
  tags: string[];
}

export function ArticleTags({ tags }: ArticleTagsProps) {
  return (
    <div className="mt-8 border-t border-border pt-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Tags:</span>
        {tags.map((tag, index) => (
          <Link
            key={index}
            to={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
            className="group relative px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            {tag}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>
    </div>
  );
}
