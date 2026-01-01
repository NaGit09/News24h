import { fallbackHeroNews } from "@/constant/home-data";
import type { Article } from "@/types/news";
import { homeCategoryBlocks } from "@/constant/home-data";

export const dataSample = (articles: Article[]) => {
    const heroNews = articles[0]
        ? {
            title: articles[0].title,
            sapo: articles[0].description.substring(0, 200) + "...",
            image:
                articles[0].image && articles[0].image.trim() !== ""
                    ? articles[0].image
                    : "/placeholder.svg",
            category: articles[0].category || "Tin tức",
            href: `/bai-viet/${articles[0].guid}`,
            publishedAt: new Date(articles[0].pubDate).toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
            }),
        }
        : fallbackHeroNews;

    const smallNews = articles.slice(1, 6).map((article) => ({
        title: article.title,
        sapo: article.description.substring(0, 150) + "...",
        image:
            article.image && article.image.trim() !== ""
                ? article.image
                : "/placeholder.svg",
        href: `/bai-viet/${article.guid}`,
        publishedAt: new Date(article.pubDate).toLocaleString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
        }),
    }));

    const newsStackItems = articles.slice(6, 16).map((article) => ({
        title: article.title,
        sapo: article.description.substring(0, 100) + "...",
        href: `/bai-viet/${article.guid}`,
        publishedAt: new Date(article.pubDate).toLocaleString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
        }),
    }));

    const trendingNews = articles.slice(16, 21).map((article, _) => ({
        title: article.title,
        image:
            article.image && article.image.trim() !== ""
                ? article.image
                : "/placeholder.svg",
        href: `/bai-viet/${article.guid}`,
        views: `${Math.floor(Math.random() * 100 + 50)}K`,
    }));

    return {
        heroNews,
        smallNews,
        newsStackItems,
        trendingNews,
        homeCategoryBlocks,
    };
}