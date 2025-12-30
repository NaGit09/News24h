import {useState} from "react"

interface CategoryFilterTabsProps {
    onFilterChange: (filter: "latest" | "popular" | "commented") => void
}

export function CategoryFilterTabs({onFilterChange}: CategoryFilterTabsProps) {
    const [activeTab, setActiveTab] = useState<"latest" | "popular" | "commented">("latest")

    const tabs = [
        {id: "latest" as const, label: "Mới nhất"},
        {id: "popular" as const, label: "Xem nhiều"},
        {id: "commented" as const, label: "Bình luận nhiều"},
    ]

    const handleTabClick = (tabId: "latest" | "popular" | "commented") => {
        setActiveTab(tabId)
        onFilterChange(tabId)
    }

    return (
        <div className="mb-6 flex gap-6 border-b border-border">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className="group relative pb-3 text-sm font-medium transition-colors duration-300"
                >
          <span
              className={`transition-colors duration-300 ${
                  activeTab === tab.id ? "text-primary" : "text-muted-foreground group-hover:text-primary"
              }`}
          >
            {tab.label}
          </span>
                    <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                            activeTab === tab.id ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    />
                </button>
            ))}
        </div>
    )
}


