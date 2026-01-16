import { fallbackHeroNews } from "@/constant/home-data";
import type { Article } from "@/types/news";
import { homeCategoryBlocks } from "@/constant/home-data";
import { formatDate } from "@/lib/time";

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
            publishedAt: formatDate(articles[0].pubDate),
            timestamp: articles[0].pubDate,
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
        publishedAt: formatDate(article.pubDate),
    }));

    const newsStackItems = articles.slice(6, 16).map((article) => ({
        title: article.title,
        sapo: article.description.substring(0, 100) + "...",
        href: `/bai-viet/${article.guid}`,
        publishedAt: formatDate(article.pubDate),
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

    const footballNews = articles.slice(21, 26).map((article, _) => ({
        title: article.title,
        image:
            article.image && article.image.trim() !== ""
                ? article.image
                : "/placeholder.svg",
        href: `/bai-viet/${article.guid}`,
        publishedAt: formatDate(article.pubDate),
    }));

    return {
        heroNews,
        smallNews,
        newsStackItems,
        trendingNews,
        footballNews,
        homeCategoryBlocks,
    };
}