import * as cheerio from 'cheerio';

export function extractSlug(url: string): string {
    const match = url.match(/\/([^/]+)\.(html|chn)$/);
    return match?.[1] || url.split('/').filter(Boolean).pop() || '';
}

export function cleanHtmlContent(html: string): string {
    const $ = cheerio.load(html, null, false);

    $('*').each(function () {
        const $el = $(this);
        const keep = ['src', 'alt', 'class', 'href'];
        const currentAttrs = $el.attr();
        if (currentAttrs) {
            Object.keys(currentAttrs).forEach((attrName) => {
                if (!keep.includes(attrName)) $el.removeAttr(attrName);
            });
        }
    });

    return $.html()
        .replace(/<(div|span|section|article)[^>]*>/gi, '')
        .replace(/<\/(div|span|section|article)>/gi, '')
        .trim();
}