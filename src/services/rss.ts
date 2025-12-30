import {XMLParser} from 'fast-xml-parser';
import * as cheerio from 'cheerio';

export interface RSSArticle {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    category?: string;
    image?: string;
    guid?: string;
}

export interface RSSFeed {
    title: string;
    description: string;
    link: string;
    articles: RSSArticle[];
}

interface RawRSSItem {
    title?: string;
    link?: string;
    description?: string | { '#text': string };
    pubDate?: string;

    [key: string]: unknown;
}


const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    processEntities: true,
    trimValues: true,
});


function extractSlug(url: string): string {
    const match = url.match(/\/([^/]+)\.(html|chn)$/);
    return match?.[1] || url.split('/').filter(Boolean).pop() || '';
}

// --- MAIN FUNCTIONS ---

export async function fetchRSSFeed(url: string, category: string): Promise<RSSFeed | null> {
    try {
        const response = await fetch(url);
        const xmlText = await response.text();
        const result = parser.parse(xmlText);

        const channel = result.rss?.channel;
        if (!channel) return null;

        const items: RawRSSItem[] = Array.isArray(channel.item) ? channel.item : [channel.item];

        const articles: RSSArticle[] = items
            .filter((i): i is RawRSSItem & { title: string } => typeof i?.title === 'string')
            .map((item) => {
                // Lấy nội dung gốc từ description (có thể là string hoặc object do parser)
                const rawDescription = typeof item.description === 'object'
                    ? (item.description as any)['#text']
                    : (item.description || '');

                // 1. Trích xuất ảnh từ nội dung thô
                const imgMatch = rawDescription.match(/<img[^>]+src=['"]?([^'"\s>]+)/i);
                const extractedImg = imgMatch ? imgMatch[1] : null;

                // 2. Làm sạch description (xóa HTML) để hiển thị text
                const cleanDescription = rawDescription
                    .replace(/<[^>]*>/g, '')
                    .replace(/\s+/g, ' ')
                    .trim();

                return {
                    title: item.title as string,
                    link: item.link || '',
                    description: cleanDescription, // Chỉ lưu text sạch vào đây
                    pubDate: item.pubDate || new Date().toISOString(),
                    category,
                    image: extractedImg || '/placeholder.svg',
                    guid: extractSlug(item.link || ''),
                };
            });

        return {
            title: channel.title,
            description: channel.description,
            link: channel.link,
            articles,
        };
    } catch (error) {
        console.error(`Lỗi fetch RSS [${category}]:`, error);
        return null;
    }
}

export async function getFullArticle(url: string) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const title = $('#article_title').text().trim();
        const sapo = $('#article_sapo').text().trim();
        const article = $('.cate-24h-foot-arti-deta-info');

        // 1. Xóa rác lớn bằng Cheerio API
        const deepJunk = [
            'script', 'style', 'iframe', 'header', 'nav', 'footer',
            '#article_sapo', '.bv-lq', '.tuht_all', '.view-more',
            '.viewVideoPlay', '.video-js', '.v-24h-media-player',
            '#zone_banner_sponser_product', '#container-24h-banner-in-image-close',
            '[id^="ADS_"]', '[class*="banner"]'
        ];
        article.find(deepJunk.join(', ')).remove();

        // 2. Xử lý ảnh (Dùng API công khai, không dùng thuộc tính node trực tiếp)
        article.find('img').each(function () {
            const $img = $(this);
            let src = $img.attr('data-original') || $img.attr('src');
            if (src && src.startsWith('/')) src = `https://cdn.24h.com.vn${src}`;

            // Xóa hết class cũ, thêm class mới sạch sẽ
            $img.attr('src', src || "")
                .attr('class', 'img-fluid rounded my-3 d-block mx-auto')
                .removeAttr('data-original')
                .removeAttr('onclick');
        });

        // 3. Dọn dẹp chuỗi bằng Regex để loại bỏ vỏ div/span
        let contentHtml = article.html() || "";
        contentHtml = contentHtml
            .replace(new RegExp('', 'g'), '')
            .replace(new RegExp('<(div|span|section|article)[^>]*>', 'gi'), '')
            .replace(new RegExp('</(div|span|section|article)>', 'gi'), '')
            .replace(new RegExp('<p[^>]*>\\s*</p>', 'gi'), '')
            .replace(/\t/g, '')
            .replace(/\n\s*\n/g, '\n')
            .trim();

        // 4. LÀM SẠCH THUỘC TÍNH (Bản sửa lỗi TS2339 & TS2352)
        // Thay vì ép kiểu node, ta dùng API công khai của Cheerio để duyệt và xóa
        const final$ = cheerio.load(contentHtml, null, false);

        final$('*').each(function () {
            const $el = final$(this);
            const keep = ['src', 'alt', 'class', 'href'];

            // Lấy danh sách tất cả attributes hiện có thông qua hàm attr() không tham số
            const currentAttrs = $el.attr();
            if (currentAttrs) {
                Object.keys(currentAttrs).forEach((attrName) => {
                    if (!keep.includes(attrName)) {
                        $el.removeAttr(attrName);
                    }
                });
            }
        });

        return {
            title: title || "Không có tiêu đề",
            sapo: sapo || "Không có sapo",
            content: final$.html() || "Nội dung không khả dụng."
        };
    } catch (error) {
        console.error("Lỗi lấy chi tiết bài viết:", error);
        return null;
    }
}

const CATEGORIES = [
    {url: "/api/rss/tintuctrongngay.rss", category: "Tin tức"},
    {url: "/api/rss/bongda.rss", category: "Bóng đá"},
    {url: "/api/rss/asiancup2019.rss", category: "Asian Cup"},
    {url: "/api/rss/anninhhinhsu.rss", category: "An ninh"},
    {url: "/api/rss/thoitrang.rss", category: "Thời trang"},
    {url: "/api/rss/thoitranghitech.rss", category: "Hi-tech"},
    {url: "/api/rss/taichinhbatdongsan.rss", category: "Kinh doanh"},
    {url: "/api/rss/amthuc.rss", category: "Ẩm thực"},
    {url: "/api/rss/lamdep.rss", category: "Làm đẹp"},
    {url: "/api/rss/phim.rss", category: "Phim"},
    {url: "/api/rss/giaoducduhoc.rss", category: "Giáo dục"},
    {url: "/api/rss/bantrecuocsong.rss", category: "Bạn trẻ"},
    {url: "/api/rss/canhacmtv.rss", category: "Ca nhạc"},
    {url: "/api/rss/thethao.rss", category: "Thể thao"},
    {url: "/api/rss/phithuongkyquac.rss", category: "Phi thường"},
    {url: "/api/rss/congnghethongtin.rss", category: "Công nghệ"},
    {url: "/api/rss/oto.rss", category: "Ô tô"},
    {url: "/api/rss/thitruongtieudung.rss", category: "Thị trường"},
    {url: "/api/rss/dulich.rss", category: "Du lịch"},
    {url: "/api/rss/suckhoedoisong.rss", category: "Sức khỏe"},
    {url: "/api/rss/cuoi24h.rss", category: "Cười"},
];

export async function fetchAllNews(): Promise<RSSArticle[]> {
    const promises = CATEGORIES.map(cat => fetchRSSFeed(cat.url, cat.category));
    const results = await Promise.allSettled(promises);

    const allArticles: RSSArticle[] = [];
    results.forEach(res => {
        if (res.status === 'fulfilled' && res.value) {
            allArticles.push(...res.value.articles);
        }
    });

    return allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}