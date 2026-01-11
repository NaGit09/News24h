export type SubMenu = {
    title: string;
    url: string;
};

export type SportArticle = {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    alt?: string;
    position: 'left' | 'middle' | 'right';
    size: 'small' | 'big';
};

export type HighlightSection = {
    category: string;
    subMenus: SubMenu[];
    articles: SportArticle[];
};

export type SpecialtyItem = {
    name: string;
    url: string;
    image: string;
    alt?: string;
};

export type SpecialtyBlock = {
    title: string;
    items: SpecialtyItem[];
    moreLink?: string | null;
};

export type SpecialtySection = {
    blocks: SpecialtyBlock[];
};
