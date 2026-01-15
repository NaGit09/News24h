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

// Hàm phát hiện tiêu đề tiềm năng từ text
const detectPotentialHeadings = (html: string): TOCItem[] => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const items: TOCItem[] = [];
  let headingIndex = 0;

  // Tìm tất cả heading tags (đã được tạo tự động từ cleanHTMLContent)
  const headingTags = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");

  // Nếu có heading tags, ưu tiên sử dụng chúng
  if (headingTags.length > 0) {
    headingTags.forEach((heading) => {
      const text = heading.textContent?.trim() || "";
      if (text.length >= 10 && text.length <= 200) {
        items.push({
          id: `heading-${headingIndex}`,
          text: text,
          level: Math.min(Number.parseInt(heading.tagName.substring(1)), 3),
        });
        headingIndex++;
      }
    });
    return items;
  }

  // Nếu không có heading, tìm các đoạn văn có đặc điểm heading
  const paragraphs = tempDiv.querySelectorAll("p");

  paragraphs.forEach((p) => {
    const text = p.textContent?.trim() || "";

    // Bỏ qua đoạn quá ngắn hoặc quá dài
    if (text.length < 20 || text.length > 200) return;

    // Tìm các pattern đặc trưng
    const hasStrongOrBold = p.querySelector("strong, b") !== null;
    const startsWithNumber = /^\d+[.)]\s/.test(text);
    const hasCapitalStart = /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/.test(text);
    const endsWithColon = text.endsWith(":");
    const hasFewSentences = (text.match(/[.!?]/g) || []).length <= 1;

    // Scoring
    let score = 0;
    if (hasStrongOrBold) score += 4;
    if (startsWithNumber) score += 3;
    if (endsWithColon) score += 3;
    if (hasCapitalStart && text.length < 100) score += 2;
    if (hasFewSentences) score += 1;

    // Threshold
    if (score >= 4) {
      items.push({
        id: `heading-${headingIndex}`,
        text: text.replace(/[:：]$/, "").trim(),
        level: hasStrongOrBold ? 2 : 3,
      });
      headingIndex++;
    }
  });

  // Nếu vẫn không có, tạo sections tự động
  if (items.length === 0) {
    const allParagraphs = Array.from(paragraphs);
    const sectionSize = Math.ceil(allParagraphs.length / 5); // Chia thành 5 phần

    for (let i = 0; i < Math.min(5, allParagraphs.length); i++) {
      const sectionP = allParagraphs[i * sectionSize];
      if (sectionP) {
        const text = sectionP.textContent?.trim() || "";
        if (text.length >= 20) {
          items.push({
            id: `heading-${i}`,
            text: text.length > 80 ? text.substring(0, 77) + "..." : text,
            level: 2,
          });
        }
      }
    }
  }

  return items;
};

export function TableOfContents({ content }: TableOfContentsProps) {
  
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Thử tìm heading có sẵn trước
    const existingHeadings = tempDiv.querySelectorAll("h2, h3");

    let items: TOCItem[];

    // Nếu có heading có sẵn
    if (existingHeadings.length > 0) {
      items = Array.from(existingHeadings).map((heading, index) => {
        const id = `heading-${index}`;
        const level = Number.parseInt(heading.tagName.substring(1));
        return {
          id,
          text: heading.textContent || "",
          level,
        };
      });
    } else {
      // Nếu không có, tự động phát hiện tiêu đề tiềm năng
      items = detectPotentialHeadings(content);
    }

    setTocItems(items);

    // Thêm ID vào các heading thực tế trong DOM
    const articleContent = document.querySelector(".article-content");
    if (articleContent) {
      const realHeadings = articleContent.querySelectorAll("h2, h3, h4, h5, h6");
      realHeadings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });

      // Nếu không có heading, thử thêm ID vào các phần tử có thể là tiêu đề
      if (realHeadings.length === 0) {
        const potentialHeadings = articleContent.querySelectorAll("strong, b");
        let validIndex = 0;
        potentialHeadings.forEach((element) => {
          const text = element.textContent?.trim() || "";
          if (text.length >= 10 && text.length <= 150) {
            const parent = element.closest("p");
            if (parent) {
              parent.id = `heading-${validIndex}`;
              validIndex++;
            }
          }
        });
      }
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

    if (articleContent) {
      // Observe tất cả các element có ID dạng heading-*
      const allHeadingElements = articleContent.querySelectorAll('[id^="heading-"]');
      allHeadingElements.forEach((element) => {
        observer.observe(element);
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
        <span className="ml-auto text-xs text-muted-foreground">({tocItems.length} mục)</span>
      </div>

      <nav className="space-y-1 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        {tocItems.map((item, index) => {
          // Tính indent dựa trên level
          const indent = item.level === 2 ? "pl-3" : item.level === 3 ? "pl-6" : "pl-9";
          const fontSize = item.level === 2 ? "text-sm" : item.level === 3 ? "text-xs" : "text-xs";

          return (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`group block w-full text-left py-2.5 ${indent} pr-3 ${fontSize} transition-all hover:text-primary hover:translate-x-1 rounded relative ${
                activeId === item.id
                  ? "text-primary font-semibold border-l-2 border-primary bg-primary/5"
                  : "text-muted-foreground border-l-2 border-transparent hover:border-primary/30"
              }`}
              title={item.text}
            >
              <div className="flex items-start gap-2">
                {/* Number indicator */}
                <span className="shrink-0 w-5 text-primary/60 font-medium">
                  {item.level === 2 ? `${index + 1}.` : '•'}
                </span>
                {/* Text content */}
                <span className="line-clamp-2 flex-1">{item.text}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
