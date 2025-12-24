import { NewsApi } from "@/services/news.service";
import { handleXml } from "../lib/xml";

async function getCategoriesNews(category: string) {
    const xml = await NewsApi(category);
    const feed = handleXml(xml);
    return feed;
}

export default getCategoriesNews;
