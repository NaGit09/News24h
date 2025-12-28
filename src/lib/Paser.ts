import { NewsApi } from "@/services/news.service";
import { handleXml } from "../lib/xml";
import { crawlArticle } from "./html";

async function getCategoriesNews(category: string) {
    const xml = await NewsApi(category);
    const feed = handleXml(xml);
    console.log(feed);
    
    return feed;
}
async function getNewsDetail(news: string) {
    const newsDetail = await crawlArticle(`/api/${news}`);

    return newsDetail;
}
export { getCategoriesNews, getNewsDetail };
