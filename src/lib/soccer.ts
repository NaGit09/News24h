import type {
    HighlightSection,
    SpecialtyBlock,
    SpecialtyItem,
    SpecialtySection,
    SportArticle,
    SubMenu,
} from "@/types/soccer";
import * as cheerio from "cheerio";
import type { Element } from "domhandler";

// Parse highlight section
export function parseHighlightSection(html: string): HighlightSection {
    const $ = cheerio.load(html);
    const root = $("section.section-tin-noi-bat");

    /* Category */
    const category = root
        .find("h1#box_name_video_highligh")
        .first()
        .text()
        .trim();

    /* Sub menu */
    const subMenus: SubMenu[] = [];
    root.find(".cate-24h-foot-menu-spec-tour-site__cate li a").each((_, el) => {
        const title = $(el).attr("title") || $(el).text().trim();
        const url = $(el).attr("href");

        if (url) {
            subMenus.push({ title, url });
        }
    });

    /* Articles */
    const articles: SportArticle[] = [];

    const parseArticle = (
        el: Element,
        position: "left" | "middle" | "right",
        size: "small" | "big"
    ) => {
        const idRaw = $(el).attr("id") || "";
        const id = idRaw.replace("box_tin_noi_bat", "");

        const link = $(el).find("h3 a");
        const img = $(el).find("img");

        const title = link.text().trim();
        const url = link.attr("href") || "";
        const thumbnail =
            img.attr("data-original") ||
            img.attr("data-src") ||
            img.attr("src") ||
            "";

        const alt = img.attr("alt") || title;

        if (!title || !url) return;

        articles.push({
            id,
            title,
            url,
            thumbnail,
            alt,
            position,
            size,
        });
    };

    /* Left */
    root.find(".coll-left article").each((_, el) => {
        parseArticle(el, "left", "small");
    });

    /* Middle */
    root.find(".coll-middle article").each((_, el) => {
        parseArticle(el, "middle", "big");
    });

    /* Right */
    root.find(".coll-right article").each((_, el) => {
        parseArticle(el, "right", "small");
    });

    return {
        category,
        subMenus,
        articles,
    };
}

// Parse specialty section
export function parseSpecialtySection(html: string): SpecialtySection {
    const $ = cheerio.load(html);
    const blocks: SpecialtyBlock[] = [];

    $(".cate-24h-foot-box-special").each((_, blockEl) => {
        const title = $(blockEl)
            .find(".cate-24h-foot-box-special__title")
            .text()
            .trim();

        const items: SpecialtyItem[] = [];

        $(blockEl)
            .find(".cate-24h-foot-box-special__item a")
            .each((_, itemEl) => {
                const name = $(itemEl).find("span").text().trim();
                const url = $(itemEl).attr("href") || "";
                const img = $(itemEl).find("img");

                const image =
                    img.attr("data-original") ||
                    img.attr("data-src") ||
                    img.attr("src") ||
                    "";

                const alt = img.attr("alt") || name;

                if (!name || !url) return;

                items.push({
                    name,
                    url,
                    image,
                    alt,
                });
            });

        const moreLink =
            $(blockEl).find(".cate-24h-foot-box-special__more a").attr("href") ||
            null;

        if (title && items.length > 0) {
            blocks.push({
                title,
                items,
                moreLink,
            });
        }
    });

    return { blocks };
}
