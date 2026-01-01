import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const headings = tempDiv.querySelectorAll("h2, h3");

    const items: TOCItem[] = Array.from(headings).map((heading, index) => {
      const id = `heading-${index}`;
      const level = Number.parseInt(heading.tagName.substring(1));
      return {
        id,
        text: heading.textContent || "",
        level,
      };
    });

    setTocItems(items);

    const articleContent = document.querySelector(".article-content");
    let realHeadings: NodeListOf<HTMLHeadingElement> | null = null;
    if (articleContent) {
      realHeadings = articleContent.querySelectorAll("h2, h3");
      realHeadings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    if (realHeadings) {
      realHeadings.forEach((heading) => {
        observer.observe(heading);
      });
    }

    return () => observer.disconnect();
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="rounded-sm border border-border bg-background/95 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
        <List className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-bold text-foreground">Nội dung bài viết</h3>
      </div>

      <nav className="space-y-1 max-h-[400px] overflow-y-auto">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`block w-full text-left py-2 px-3 text-sm transition-all hover:text-primary hover:translate-x-1 ${
              item.level === 3 ? "pl-6" : ""
            } ${
              activeId === item.id
                ? "text-primary font-semibold border-l-2 border-primary bg-primary/5"
                : "text-muted-foreground border-l-2 border-transparent"
            }`}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
}
