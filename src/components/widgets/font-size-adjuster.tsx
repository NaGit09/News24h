import {useState, useEffect} from "react"
import {Type} from "lucide-react"
import { toast } from "sonner"

export function FontSizeAdjuster() {
    const [fontSize, setFontSize] = useState<"small" | "medium" | "large" | "xlarge">("medium")

    const handleFontSizeChange = (size: "small" | "medium" | "large" | "xlarge") => {
        setFontSize(size)

        // Apply font size to article content
        const articleContent = document.querySelector(".article-content")
        if (articleContent) {
            articleContent.classList.remove("text-sm", "text-base", "text-lg", "text-xl")

            if (size === "small") {
                articleContent.classList.add("text-sm")
            } else if (size === "medium") {
                articleContent.classList.add("text-base")
            } else if (size === "large") {
                articleContent.classList.add("text-lg")
            } else {
                articleContent.classList.add("text-xl")
            }
        }

        // Save preference to localStorage
        localStorage.setItem("articleFontSize", size)
        
        // Show toast
        const sizeLabels = {
            small: "Nhỏ",
            medium: "Vừa",
            large: "Lớn",
            xlarge: "Rất lớn"
        };
        toast.success(`Đã đổi cỡ chữ: ${sizeLabels[size]}`);
    }

    // Load saved preference on mount
    useEffect(() => {
        const saved = localStorage.getItem("articleFontSize") as "small" | "medium" | "large" | "xlarge" | null
        if (saved) {
            setFontSize(saved)
            // Apply saved size after a small delay to ensure DOM is ready
            setTimeout(() => {
                const articleContent = document.querySelector(".article-content")
                if (articleContent) {
                    articleContent.classList.remove("text-sm", "text-base", "text-lg", "text-xl")
                    if (saved === "small") {
                        articleContent.classList.add("text-sm")
                    } else if (saved === "medium") {
                        articleContent.classList.add("text-base")
                    } else if (saved === "large") {
                        articleContent.classList.add("text-lg")
                    } else {
                        articleContent.classList.add("text-xl")
                    }
                }
            }, 100)
        }
    }, [])

    return (
        <div className="flex items-center gap-2 border-l border-border pl-4">
            <Type className="h-4 w-4 text-muted-foreground"/>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => handleFontSizeChange("small")}
                    className={`px-2 py-1 text-xs font-medium transition-colors ${
                        fontSize === "small" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="Chữ nhỏ"
                    title="Chữ nhỏ"
                >
                    A-
                </button>
                <button
                    onClick={() => handleFontSizeChange("medium")}
                    className={`px-2 py-1 text-sm font-medium transition-colors ${
                        fontSize === "medium" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="Chữ vừa"
                    title="Chữ vừa"
                >
                    A
                </button>
                <button
                    onClick={() => handleFontSizeChange("large")}
                    className={`px-2 py-1 text-base font-medium transition-colors ${
                        fontSize === "large" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="Chữ lớn"
                    title="Chữ lớn"
                >
                    A+
                </button>
                <button
                    onClick={() => handleFontSizeChange("xlarge")}
                    className={`px-2 py-1 text-lg font-medium transition-colors ${
                        fontSize === "xlarge" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="Chữ rất lớn"
                    title="Chữ rất lớn"
                >
                    A++
                </button>
            </div>
        </div>
    )
}


