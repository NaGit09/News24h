import type {Image} from "./image";
import type {Category} from "./rss";

export interface NewsDetail {
    title: string;
    description: string;
    publishedAt: string;
    author: string;
    contentHtml: string;
    images: Image[];
}

export interface NewsState {
    feed: Category | null;
    news: NewsDetail | null;
    loading: boolean;
    error: string | null;
}

/**
 * Dữ liệu thô từ XML Parser (Dữ liệu chưa sạch)
 */
export interface RawArticle {
    title?: string;
    link?: string;
    description?: string | { "#text": string };
    pubDate?: string;

    [key: string]: unknown;
}

export interface RawChannel {
    title: string;
    description: string;
    link: string;
    item?: RawArticle | RawArticle[];
}

/**
 * Model chính dùng trong toàn bộ App (Dữ liệu đã sạch)
 */
export interface Article {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    category?: string;
    image: string;
    guid: string;
}

export interface NewsFeed {
    title: string;
    description: string;
    link: string;
    articles: Article[];
}

/**
 * Chi tiết bài viết sau khi Crawl
 */
export interface ArticleDetail {
    title: string;
    sapo: string;
    content: string;
}