import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/home";
import ArticlePage from "@/pages/article-detail";
import GoldPricePage from "@/pages/gold-price";
import TagPage from "@/pages/tag";
import CategoryPage from "@/pages/category";
import NotFound from "@/pages/not-found";
import StockPage from "@/pages/stock";
import { RootLayout } from "@/components/layout/root-layout.tsx";
import WeatherPage from "@/pages/weather";
import CalendarPage from "@/pages/calendar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "bai-viet/:slug", element: <ArticlePage /> },
      { path: "gia-vang", element: <GoldPricePage /> },
      { path: "chung-khoan", element: <StockPage /> },
      { path: "tu-khoa/:tag", element: <TagPage /> },
      { path: "danh-muc/:category", element: <CategoryPage /> },
      { path: "thoi-tiet", element: <WeatherPage /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "lich-van-nien", element: <CalendarPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
