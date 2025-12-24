export interface Category {
    items: CategoryItem[];
    image: {
        url: string;
        title: string;
        link: string;
    };
    title: string;
    description: string;
    pubDate: string;
    generator: string;
    link: string;
    language: string;
    copyright: string;
    ttl: number;
}

export interface CategoryItem {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    guid: string;
}