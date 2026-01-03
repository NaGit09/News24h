import axiosInstance from "./api.service";
import type { Article, ArticleDetail, NewsFeed } from "@/types/news.ts";
import { cleanHtmlContent } from "@/lib/html.ts";
import { RSS_CATEGORIES, getRssUrl } from "@/constant/categories.ts";
import { parseHtml } from "@/lib/html";
import { parseXml } from "@/lib/xml";

export const NewsApi = async (url: string): Promise<string> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

// get news feed from category
export async function getNewsFeed(
  category: string
): Promise<NewsFeed | null> {
  try {
    const url = getRssUrl(category);
    if (!url) return null;

    const xmlText = await NewsApi(url);
    const parsed = parseXml(xmlText);

    if (!parsed) {
      return null;
    }

    const { channel, articles } = parsed;

    return {
      title: channel.title,
      description: channel.description,
      link: channel.link,
      articles,
    };
  } catch {
    return null;
  }
}

//  parse html from article 24h to article detail
export async function getFullArticle(
  url: string
): Promise<ArticleDetail | null> {
  try {
    let requestUrl = url;
    // Handle 24h.com.vn URLs via proxy
    if (url.includes('24h.com.vn')) {
      requestUrl = url.replace(/^(https?:)?\/\/www\.24h\.com\.vn\//, '/api/');
    }

    const response = await axiosInstance.get(requestUrl);

    const html = response.data;

    const { title, sapo, content } = parseHtml(html);

    return {
      title: title || "Không có tiêu đề",
      sapo: sapo || "Không có sapo",
      content: cleanHtmlContent(content || ""),
    };
  } catch (err) {
    console.error("Crawl error:", err);
    return null;
  }
}

// get all news from all categories
export async function getAllNews(): Promise<Article[]> {

  const promises = RSS_CATEGORIES.map((cat) => getNewsFeed(cat.category));

  const results = await Promise.allSettled(promises);

  const allArticles: Article[] = [];

  results.forEach((res) => {
    if (res.status === "fulfilled" && res.value) {
      allArticles.push(...res.value.articles);
    }
  });

  return allArticles.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}
