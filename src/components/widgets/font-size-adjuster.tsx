import {useState} from "react"
import {Type} from "lucide-react"

export function FontSizeAdjuster() {
    const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")

    const handleFontSizeChange = (size: "small" | "medium" | "large") => {
        setFontSize(size)

        // Apply font size to article content
        const articleContent = document.querySelector(".article-content")
        if (articleContent) {
            articleContent.classList.remove("text-sm", "text-base", "text-lg")

            if (size === "small") {
                articleContent.classList.add("text-sm")
            } else if (size === "medium") {
                articleContent.classList.add("text-base")
            } else {
                articleContent.classList.add("text-lg")
            }
        }

        // Save preference to localStorage
        localStorage.setItem("articleFontSize", size)
    }

    // Load saved preference on mount
    useState(() => {
        const saved = localStorage.getItem("articleFontSize") as "small" | "medium" | "large" | null
        if (saved) {
            setFontSize(saved)
            // Apply saved size after a small delay to ensure DOM is ready
            setTimeout(() => handleFontSizeChange(saved), 100)
        }
    })

    return (
        <div className="flex items-center gap-2 border-l border-border pl-4">
            <Type className="h-4 w-4 text-muted-foreground"/>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => handleFontSizeChange("small")}
                    className={`px-2 py-1 text-sm font-medium transition-colors ${
                        fontSize === "small" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="Chữ nhỏ"
                >
                    A-
                </button>
                <button
                    onClick={() => handleFontSizeChange("medium")}
                    className={`px-2 py-1 text-base font-medium transition-colors ${
                        fontSize === "medium" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="Chữ vừa"
                >
                    A
                </button>
                <button
                    onClick={() => handleFontSizeChange("large")}
                    className={`px-2 py-1 text-lg font-medium transition-colors ${
                        fontSize === "large" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="Chữ lớn"
                >
                    A+
                </button>
            </div>
        </div>
    )
}


