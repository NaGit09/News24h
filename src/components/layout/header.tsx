import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { LiveNewsTicker } from "../widgets/live-news-ticker.tsx";
import { MegaMenu } from "./mega-menu.tsx";
import { SearchOverlay } from "../widgets/search-overlay.tsx";
import {
  TrendingUpIcon,
  type TrendingUpIconHandle,
} from "../ui/trending-up.tsx";
import {
  CalendarDaysIcon,
  type CalendarDaysIconHandle,
} from "../ui/calendar-days.tsx";
import { CloudSunIcon, type CloudSunIconHandle } from "../ui/cloud-sun.tsx";
import { MoonIcon } from "../ui/moon.tsx";
import { SunIcon } from "../ui/sun.tsx";
import { SearchIcon } from "../ui/search.tsx";
import { UserIcon } from "../ui/user.tsx";
import { MenuIcon } from "../ui/menu.tsx";
import { ChartLineIcon, type ChartLineIconHandle } from "../ui/chart-line.tsx";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const calendarRef = useRef<CalendarDaysIconHandle>(null);
  const weatherRef = useRef<CloudSunIconHandle>(null);
  const goldRef = useRef<TrendingUpIconHandle>(null);
  const chartRef = useRef<ChartLineIconHandle>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

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
                  <Link
                    to="/lich-van-nien"
                    className="hidden md:inline-flex items-center gap-1 hover:text-primary transition-colors"
                    onMouseEnter={() => calendarRef.current?.startAnimation()}
                    onMouseLeave={() => calendarRef.current?.stopAnimation()}
                  >
                    <CalendarDaysIcon ref={calendarRef} size={18} />
                    {new Date().toLocaleDateString("vi-VN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Link>
                  <Link
                    to="/thoi-tiet"
                    className="hidden md:flex items-center gap-1 hover:text-primary transition-colors"
                    onMouseEnter={() => weatherRef.current?.startAnimation()}
                    onMouseLeave={() => weatherRef.current?.stopAnimation()}
                  >
                    <CloudSunIcon ref={weatherRef} size={18} />
                    <span>Hà Nội 18°C</span>
                  </Link>
                  <Link
                    to="/gia-vang"
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                    onMouseEnter={() => goldRef.current?.startAnimation()}
                    onMouseLeave={() => goldRef.current?.stopAnimation()}
                  >
                    <TrendingUpIcon ref={goldRef} size={18} />
                    <span className="text-primary font-medium">
                      Vàng SJC 82.5tr
                    </span>
                  </Link>
                  <Link
                    to="/chung-khoan"
                    className="flex items-center gap-1 hover:text-accent transition-colors"
                    onMouseEnter={() => chartRef.current?.startAnimation()}
                    onMouseLeave={() => chartRef.current?.stopAnimation()}
                  >
                    <ChartLineIcon ref={chartRef} size={18} />
                    <span className="font-medium">Chứng khoán</span>
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleDarkMode}
                    className="p-1 rounded hover:bg-muted transition-colors"
                    aria-label="Toggle dark mode"
                  >
                    {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                  </button>
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-1 rounded hover:bg-muted transition-colors"
                    aria-label="Search"
                  >
                    <SearchIcon size={18} />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-muted transition-colors"
                    aria-label="User menu"
                  >
                    <UserIcon size={18} />
                  </button>
                  <button
                    className="lg:hidden p-1"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <MenuIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <MegaMenu isScrolled={isScrolled} />
      </header>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-90 lg:hidden bg-background">
          <div className="container mx-auto px-4 pt-20 pb-6 overflow-y-auto h-full">
            <nav className="space-y-4">
              <Link
                to="/"
                className="block py-2 text-lg font-medium border-b border-border"
              >
                Trang chủ
              </Link>
              <Link
                to="/tin-tuc"
                className="block py-2 text-lg font-medium border-b border-border"
              >
                Tin tức
              </Link>
              <Link
                to="/bong-da"
                className="block py-2 text-lg font-medium border-b border-border"
              >
                Bóng đá
              </Link>
              <Link
                to="/the-thao"
                className="block py-2 text-lg font-medium border-b border-border"
              >
                Thể thao
              </Link>
              <Link
                to="/kinh-doanh"
                className="block py-2 text-lg font-medium border-b border-border"
              >
                Kinh doanh
              </Link>
              <Link
                to="/giai-tri"
                className="block py-2 text-lg font-medium border-b border-border"
              >
                Giải trí
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
