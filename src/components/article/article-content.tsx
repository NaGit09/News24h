import type React from "react";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const images = contentRef.current.querySelectorAll("img");

    images.forEach((img) => {
      img.loading = "lazy";

      const altText = img.getAttribute("alt");
      if (altText && altText.trim().length > 0) {
        const nextSibling = img.nextElementSibling;
        const isNextCaption =
          nextSibling?.tagName === "FIGCAPTION" ||
          (nextSibling?.tagName === "P" &&
            nextSibling?.classList.contains("image-caption"));

        const parent = img.parentElement;
        const isFigureWrapped = parent?.tagName === "FIGURE";

        if (!isNextCaption && !isFigureWrapped) {
          const caption = document.createElement("p");
          caption.textContent = altText;
          caption.className =
            "image-caption mt-3 text-center text-sm italic text-muted-foreground bg-muted/20 py-2 px-4 rounded-lg";

          img.parentNode?.insertBefore(caption, img.nextSibling);
        }
      }
    });
  }, [content]);

  const handleImageClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      const img = target as HTMLImageElement;
      setLightboxImage(img.src);
    }
  };

  return (
    <>
      <div
        ref={contentRef}
        className="article-content space-y-6 text-lg leading-8 text-foreground/90 
        [&_h2]:mt-10 [&_h2]:mb-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground
        [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground
        [&_p]:my-6 [&_p]:text-pretty
        [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
        [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2
        [&_li]:pl-1
        [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-muted/30 [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:italic [&_blockquote]:text-foreground/80 [&_blockquote]:rounded-r-lg
        [&_img]:my-8 [&_img]:max-w-full [&_img]:max-h-[85vh] [&_img]:w-auto [&_img]:mx-auto [&_img]:h-auto [&_img]:rounded-xl [&_img]:shadow-md [&_img]:cursor-pointer [&_img]:transition-transform hover:[&_img]:scale-[1.01]
        [&_figure]:my-8 [&_figure]:mx-0
        [&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:italic [&_figcaption]:text-muted-foreground
        [&_p.image-caption]:mt-3 [&_p.image-caption]:text-center [&_p.image-caption]:text-sm [&_p.image-caption]:italic [&_p.image-caption]:text-muted-foreground
        [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary/80"
        dangerouslySetInnerHTML={{ __html: content }}
        onClick={handleImageClick}
      />

      {lightboxImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={lightboxImage || "/placeholder.svg"}
              alt="Full screen"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
