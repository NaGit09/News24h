import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { RootLayout } from "./components/layout/root-layout";

const HomePage = lazy(() => import("@/pages/home"));
const ArticlePage = lazy(() => import("@/pages/article-detail"));
const GoldPricePage = lazy(() => import("@/pages/gold-price"));
const TagPage = lazy(() => import("@/pages/tag"));
const CategoryPage = lazy(() => import("@/pages/category"));
const NotFound = lazy(() => import("@/pages/not-found"));
const StockPage = lazy(() => import("@/pages/stock"));
const WeatherPage = lazy(() => import("@/pages/weather"));
const CalendarPage = lazy(() => import("@/pages/calendar"));
const ProfilePage = lazy(() => import("@/pages/profile"));

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
      { path: "ca-nhan", element: <ProfilePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
