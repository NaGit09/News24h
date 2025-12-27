import type { Image } from "@/types/image";
import type { NewsDetail } from "@/types/news";
import axios from "axios";
import * as cheerio from "cheerio";

export async function crawlArticle(url: string): Promise<NewsDetail> {
    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);

    const title =
        $("h1.title-detail").first().text().trim() ||
        $("h1").first().text().trim();

    const description =
        $("p.description").first().text().trim() ||
        $('meta[name="description"]').attr("content") ||
        "";

    const publishedAt = $(".header-content .date").first().text().trim();

    const article = $(".cate-24h-foot-arti-deta-info").first().clone();

    if (!article.length) {
        throw new Error("Article content not found");
    }

    article.find(`
        script,
        style,
        iframe,
        ins,
        meta,
        link,
        .social,
        .action_thumb,
        .embed-container-ads,
        .box-ads,
        [id^="ADS_"],
        [class*="ads"],
        [class*="Ads"]
    `).remove();

    article.find("noscript").remove();


    article.find("img").each((_, el) => {
        const $img = $(el);

        const src = $img.attr("src");
        const dataSrc =
            $img.attr("data-src") ||
            $img.attr("data-original") ||
            $img.attr("data-lazy-src");

        if (
            (!src || src.startsWith("data:image")) &&
            dataSrc
        ) {
            $img.attr("src", dataSrc);
        }

        const finalSrc = $img.attr("src");
        if (finalSrc?.startsWith("/")) {
            $img.attr("src", new URL(url).origin + finalSrc);
        }

        $img.removeAttr("data-src");
        $img.removeAttr("data-original");
        $img.removeAttr("data-lazy-src");
        $img.removeAttr("loading");
        $img.removeAttr("referrerpolicy");
    });


    article.find("video source").each((_, el) => {
        const $source = $(el);
        const src =
            $source.attr("src") ||
            $source.attr("data-src") ||
            $source.attr("data-original");

        if (src) $source.attr("src", src);

        $source.removeAttr("data-src");
        $source.removeAttr("data-original");
    });

    const author =
        article
            .find('p[style*="text-align:right"] strong')
            .first()
            .text()
            .trim() || "";

    const contentHtml = article.html();
    if (!contentHtml) {
        throw new Error("Content HTML empty");
    }

    const images: Image[] = [];
    article.find("img").each((_, img) => {
        const src = $(img).attr("src");
        if (src) {
            images.push({
                src,
                alt: $(img).attr("alt") || ""
            });
        }
    });

    return {
        title,
        description,
        publishedAt,
        author,
        contentHtml,
        images
    };
}
