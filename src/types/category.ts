export interface CategorySection {
    title: string
    slug: string
    articles: {
        title: string
        slug: string
        thumbnail?: string
        publishedAt: string
        sapo?: string
    }[]
}
