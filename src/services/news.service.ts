import axiosInstance from "./api.service";
import {XMLParser} from 'fast-xml-parser';
import * as cheerio from 'cheerio';
import type {Article, ArticleDetail, NewsFeed, RawArticle, RawChannel} from "@/types/news.ts";
import {cleanHtmlContent, extractSlug} from "@/lib/parser.ts";

export const NewsApi = async (category: string): Promise<string> => {
  const response = await axiosInstance.get(`/api/rss/${category}.rss`);
  return response.data;
};

const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    processEntities: true,
    trimValues: true,
});

export async function fetchFeed(url: string, category: string): Promise<NewsFeed | null> {
    try {
        const response = await fetch(url);
        const xmlText = await response.text();
        const result = xmlParser.parse(xmlText);

        const channel = result.rss?.channel as RawChannel | undefined;
        if (!channel) return null;

        const rawItems = channel.item;
        const items: RawArticle[] = Array.isArray(rawItems)
            ? rawItems
            : rawItems ? [rawItems] : [];

        const articles: Article[] = items
            .filter((i): i is RawArticle & { title: string } => typeof i?.title === 'string')
            .map((item) => {
                const rawDesc = typeof item.description === 'object'
                    ? item.description['#text']
                    : (item.description || '');

                const imgMatch = rawDesc.match(/<img[^>]+src=['"]?([^'"\s>]+)/i);

                return {
                    title: item.title,
                    link: item.link || '',
                    description: rawDesc.replace(/<[^>]*>/g, '').trim(),
                    pubDate: item.pubDate || new Date().toISOString(),
                    category,
                    image: imgMatch ? imgMatch[1] : '/placeholder.svg',
                    guid: extractSlug(item.link || ''),
                };
            });

        return {
            title: channel.title,
            description: channel.description,
            link: channel.link,
            articles
        };
    } catch {
        return null;
    }
}

export async function getFullArticle(url: string): Promise<ArticleDetail | null> {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const title = $('#article_title').text().trim();
        const sapo = $('#article_sapo').text().trim();
        const articleContainer = $('.cate-24h-foot-arti-deta-info');

        articleContainer.find('script, style, iframe, .bv-lq, .view-more').remove();

        articleContainer.find('img').each(function () {
            const $img = $(this);
            let src = $img.attr('data-original') || $img.attr('src');
            if (src?.startsWith('/')) src = `https://cdn.24h.com.vn${src}`;
            $img.attr('src', src || "")
                .attr('class', 'img-fluid rounded my-3 d-block mx-auto');
        });

        return {
            title: title || "Không có tiêu đề",
            sapo: sapo || "Không có sapo",
            content: cleanHtmlContent(articleContainer.html() || "")
        };
    } catch (err) {
        console.error("Crawl error:", err);
        return null;
    }
}