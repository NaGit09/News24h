import type React from "react"
import {useState} from "react"
import {X} from "lucide-react"

interface ArticleContentProps {
    content: string
}

export function ArticleContent({content}: ArticleContentProps) {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null)

    const handleImageClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement
        if (target.tagName === "IMG") {
            const img = target as HTMLImageElement
            setLightboxImage(img.src)
        }
    }

    return (
        <>
            <div
                className="article-content space-y-4 text-base leading-relaxed text-foreground/90 [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-muted/30 [&_blockquote]:py-4 [&_blockquote]:pl-6 [&_blockquote]:pr-4 [&_blockquote]:italic [&_blockquote]:text-foreground/80 [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_img]:my-6 [&_img]:w-full [&_img]:cursor-pointer [&_img]:transition-transform hover:[&_img]:scale-[1.02] [&_li]:mb-2 [&_li]:ml-6 [&_li]:list-disc [&_p.image-caption]:mt-2 [&_p.image-caption]:text-center [&_p.image-caption]:text-sm [&_p.image-caption]:italic [&_p.image-caption]:text-muted-foreground [&_p]:my-4 [&_p]:text-pretty [&_p]:leading-7 [&_ul]:my-4 [&_ul]:space-y-2"
                dangerouslySetInnerHTML={{__html: content}}
                onClick={handleImageClick}
            />

            {lightboxImage && (
                <div
                    className="fixed inset-0 z-200 flex items-center justify-center bg-black/95 p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                        onClick={() => setLightboxImage(null)}
                    >
                        <X className="h-6 w-6"/>
                    </button>
                    <img
                        src={lightboxImage || "/placeholder.svg"}
                        alt="Full screen"
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                    />
                </div>
            )}
        </>
    )
}


