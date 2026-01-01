
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

export interface ArticleDetail {
    title: string;
    sapo: string;
    content: string;
}

export interface ArticleState {
    articles: Article[];
    currentArticle: ArticleDetail | null;
    loading: boolean;
    error: string | null;
}