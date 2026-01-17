import {useCallback, useEffect, useState} from "react"
import {Clock, Filter, Search, TrendingUp, X} from "lucide-react"
import {Link} from "react-router"
import { ImageWithFallback } from "@/components/common/image-with-fallback"


interface SearchResult {
    id: string
    title: string
    sapo: string
    category: string
    thumbnail: string
    time: string
    url: string
}

interface SearchOverlayProps {
    isOpen: boolean
    onClose: () => void
}

export function SearchOverlay({isOpen, onClose}: SearchOverlayProps) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])
    const [recentSearches, setRecentSearches] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [isSearching, setIsSearching] = useState(false)

    // Load recent searches from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("recentSearches")
        if (saved) {
            setRecentSearches(JSON.parse(saved))
        }
    }, [])

    // Mock search function - in real app, this would call API
    const performSearch = useCallback((searchQuery: string, category: string) => {
        if (!searchQuery.trim()) {
            setResults([])
            return
        }

        setIsSearching(true)

        // Mock results - replace with actual API call
        setTimeout(() => {
            const mockResults: SearchResult[] = [
                {
                    id: "1",
                    title: "Giá vàng SJC tăng mạnh trong phiên giao dịch đầu tuần",
                    sapo: "Giá vàng miếng SJC tăng 500.000 đồng/lượng, lên mức 82.5 triệu đồng/lượng do ảnh hưởng từ thị trường thế giới.",
                    category: "Kinh doanh",
                    thumbnail: "/gold-price-chart-trending.jpg",
                    time: "2 giờ trước",
                    url: "/bai-viet/gia-vang-sjc-tang",
                },
                {
                    id: "2",
                    title: "VN-Index vượt mốc 1,300 điểm sau 3 phiên tăng liên tiếp",
                    sapo: "Thị trường chứng khoán Việt Nam ghi nhận phiên tăng điểm thứ 3 liên tiếp với thanh khoản cải thiện.",
                    category: "Kinh doanh",
                    thumbnail: "/stock-market-growth.jpg",
                    time: "4 giờ trước",
                    url: "/bai-viet/vn-index-vuot-1300",
                },
                {
                    id: "3",
                    title: "Quốc hội thông qua Luật Đất đai sửa đổi",
                    sapo: "Luật có nhiều điểm mới về quyền sử dụng đất, chuyển nhượng và bồi thường giải phóng mặt bằng.",
                    category: "Tin tức",
                    thumbnail: "/government-meeting.png",
                    time: "5 giờ trước",
                    url: "/bai-viet/luat-dat-dai-sua-doi",
                },
            ]

            // Filter by category if not 'all'
            const filtered =
                category === "all"
                    ? mockResults
                    : mockResults.filter((r) => r.category.toLowerCase() === category.toLowerCase())

            setResults(filtered)
            setIsSearching(false)
        }, 500)
    }, [])

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            performSearch(query, selectedCategory)
        }, 300)

        return () => clearTimeout(timer)
    }, [query, selectedCategory, performSearch])

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery)
        if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
            const updated = [searchQuery, ...recentSearches].slice(0, 5)
            setRecentSearches(updated)
            localStorage.setItem("recentSearches", JSON.stringify(updated))
        }
    }

    const clearRecentSearches = () => {
        setRecentSearches([])
        localStorage.removeItem("recentSearches")
    }

    const categories = [
        {id: "all", label: "Tất cả"},
        {id: "tin-tuc", label: "Tin tức"},
        {id: "kinh-doanh", label: "Kinh doanh"},
        {id: "bong-da", label: "Bóng đá"},
        {id: "giai-tri", label: "Giải trí"},
        {id: "the-thao", label: "Thể thao"},
    ]

    const popularSearches = ["Bóng đá", "Giá vàng", "Thời tiết", "Lãi suất", "Giải trí"]

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-100 bg-background/95 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="container mx-auto px-4 pt-20 pb-8 h-full overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 border-b-2 border-primary pb-3 mb-6">
                        <Search className="h-5 w-5 text-primary shrink-0"/>
                        <input
                            type="text"
                            placeholder="Tìm kiếm tin tức, sự kiện..."
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
                            autoFocus
                        />
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-muted rounded transition-colors"
                            aria-label="Close search"
                        >
                            <X className="h-5 w-5"/>
                        </button>
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border overflow-x-auto">
                        <Filter className="h-4 w-4 text-muted-foreground shrink-0"/>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3 py-1.5 text-sm rounded whitespace-nowrap transition-colors ${
                                    selectedCategory === cat.id
                                        ? "bg-primary text-primary-foreground"
                                        : "border border-border hover:bg-muted"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Results */}
                    {query && (
                        <div className="mb-8">
                            <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                                <Search className="h-4 w-4"/>
                                Kết quả tìm kiếm {results.length > 0 && `(${results.length})`}
                            </h3>

                            {isSearching ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex gap-4 animate-pulse">
                                            <div className="w-32 h-20 bg-muted rounded"/>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-muted rounded w-3/4"/>
                                                <div className="h-3 bg-muted rounded w-full"/>
                                                <div className="h-3 bg-muted rounded w-1/2"/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : results.length > 0 ? (
                                <div className="space-y-4">
                                    {results.map((result) => (
                                        <Link
                                            key={result.id}
                                            to={result.url}
                                            onClick={onClose}
                                            className="flex gap-4 p-3 rounded hover:bg-muted transition-colors group"
                                        >
                                            <div className="relative w-32 h-20 shrink-0 overflow-hidden rounded bg-muted">
                                                <ImageWithFallback
                                                    src={result.thumbnail}
                                                    alt={result.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                    fallbackSrc="/placeholder.svg"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span
                                                        className="text-xs text-primary font-medium">{result.category}</span>
                                                    <span className="text-xs text-muted-foreground">{result.time}</span>
                                                </div>
                                                <h4 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                                                    {result.title}
                                                </h4>
                                                <p className="text-xs text-muted-foreground line-clamp-2">{result.sapo}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground py-8 text-center">Không tìm thấy kết quả cho
                                    "{query}"</p>
                            )}
                        </div>
                    )}

                    {/* Recent Searches */}
                    {!query && recentSearches.length > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium flex items-center gap-2">
                                    <Clock className="h-4 w-4"/>
                                    Tìm kiếm gần đây
                                </h3>
                                <button onClick={clearRecentSearches}
                                        className="text-xs text-muted-foreground hover:text-foreground">
                                    Xóa tất cả
                                </button>
                            </div>
                            <div className="space-y-2">
                                {recentSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setQuery(search)}
                                        className="flex items-center gap-3 w-full text-left px-3 py-2 rounded hover:bg-muted transition-colors group"
                                    >
                                        <Clock className="h-4 w-4 text-muted-foreground"/>
                                        <span className="flex-1 text-sm">{search}</span>
                                        <Search
                                            className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"/>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Popular Searches */}
                    {!query && (
                        <div>
                            <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4"/>
                                Tìm kiếm phổ biến
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {popularSearches.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => setQuery(tag)}
                                        className="px-4 py-2 text-sm border border-border rounded-full hover:bg-muted hover:border-primary transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


