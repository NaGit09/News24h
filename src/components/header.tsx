"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, Search, User, Sun, Moon, TrendingUp, Cloud, X } from "lucide-react"
import { LiveNewsTicker } from "./live-news-ticker"
import { MegaMenu } from "./mega-menu"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(!isDark)
  }

  return (
    <>
      <div className="bg-primary border-b border-primary">
        <div className="container mx-auto">
          <LiveNewsTicker />
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 w-full border-b border-border bg-background transition-all duration-300 ${
          isScrolled ? "shadow-md backdrop-blur-md bg-background/95" : ""
        }`}
      >
        {!isScrolled && (
          <div className="border-b border-border/50">
            <div className="container mx-auto px-4">
              <div className="flex h-9 items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="hidden md:inline">Thứ Hai, 28/12/2024</span>
                  <Link
                    href="/thoi-tiet"
                    className="hidden md:flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <Cloud className="h-3 w-3" />
                    <span>Hà Nội 18°C</span>
                  </Link>
                  <Link href="/gia-vang" className="flex items-center gap-1 hover:text-accent transition-colors">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-accent font-medium">Vàng SJC 82.5tr</span>
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleDarkMode}
                    className="p-1 rounded hover:bg-muted transition-colors"
                    aria-label="Toggle dark mode"
                  >
                    {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-1 rounded hover:bg-muted transition-colors"
                    aria-label="Search"
                  >
                    <Search className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1 rounded hover:bg-muted transition-colors" aria-label="User menu">
                    <User className="h-3.5 w-3.5" />
                  </button>
                  <button className="lg:hidden p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <MegaMenu isScrolled={isScrolled} />
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 pt-20">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 border-b-2 border-primary pb-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm tin tức..."
                  className="flex-1 bg-transparent text-lg outline-none"
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-sm text-muted-foreground">Tìm kiếm phổ biến:</p>
                <div className="flex flex-wrap gap-2">
                  {["Bóng đá", "Giá vàng", "Thời tiết", "Kinh tế", "Giải trí"].map((tag) => (
                    <button key={tag} className="px-3 py-1 text-sm border border-border rounded hover:bg-muted">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden bg-background">
          <div className="container mx-auto px-4 pt-20 pb-6 overflow-y-auto h-full">
            <nav className="space-y-4">
              <Link href="/" className="block py-2 text-lg font-medium border-b border-border">
                Trang chủ
              </Link>
              <Link href="/tin-tuc" className="block py-2 text-lg font-medium border-b border-border">
                Tin tức
              </Link>
              <Link href="/bong-da" className="block py-2 text-lg font-medium border-b border-border">
                Bóng đá
              </Link>
              <Link href="/the-thao" className="block py-2 text-lg font-medium border-b border-border">
                Thể thao
              </Link>
              <Link href="/kinh-doanh" className="block py-2 text-lg font-medium border-b border-border">
                Kinh doanh
              </Link>
              <Link href="/giai-tri" className="block py-2 text-lg font-medium border-b border-border">
                Giải trí
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
