import type { Image } from "./image";
import type { Category } from "./rss";

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
