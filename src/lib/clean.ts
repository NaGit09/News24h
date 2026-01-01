import type { Article, ArticleDetail } from "@/types/news";

export const cleanArticleContent = (
    rssArticle: Article , fullArticle?: ArticleDetail) => {
      const articleTitle : string = fullArticle?.title || rssArticle.title;
    
      const articleSapo : string =
        fullArticle?.sapo || rssArticle.description.substring(0, 300);
      
      const articleContent : string =
        fullArticle?.content ||
        `
        <p>${rssArticle.description}</p>
        ${
          rssArticle.image
            ? `<img src="${rssArticle.image}" alt="${rssArticle.title}" class="img-fluid rounded my-3" />`
            : ""
        }
      `;
    
      const plainTextContent = articleContent
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
          .trim();
    return {
        articleTitle,
        articleSapo,
        articleContent,
        plainTextContent
    }
}