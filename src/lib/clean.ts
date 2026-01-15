import type { Article, ArticleDetail } from "@/types/news";

/**
 * Làm sạch HTML content từ RSS feed
 * Loại bỏ: script, ads, banner, div rác, comment
 * Tự động tạo heading từ các đoạn văn đặc biệt
 */
export const cleanHTMLContent = (html: string): string => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // 1. XÓA CÁC ELEMENTS RÁC
  const removeSelectors = [
    'script',
    'style',
    'noscript',
    'iframe',
    'object',
    'embed',
    // Ads & Banner
    '[id*="banner"]',
    '[id*="ADS_"]',
    '[class*="banner"]',
    '[class*="adver"]',
    '[id*="zone_banner"]',
    // Các div rác của 24h
    '.bv-lq', // Tin liên quan trong bài
    '.img_tin_lien_quan_trong_bai',
    '.txtBnrHor',
    '.see-now',
    '#container-24h-banner-in-image',
    '[id*="24h-banner"]',
    // Social buttons, toolbars
    '.social-share',
    '.share-buttons',
    '.toolbar',
    // Related articles boxes (sẽ có component riêng)
    '.related-news',
    '.tin-lien-quan',
    // Sapo header (đã hiển thị riêng ở ngoài)
    'h2.cate-24h-foot-arti-deta-sum',
    'h2.sum',
    'h2[id*="article_sapo"]',
  ];

  removeSelectors.forEach(selector => {
    tempDiv.querySelectorAll(selector).forEach(el => el.remove());
  });

  // 2. LOẠI BỎ ATTRIBUTES RÁC
  const allElements = tempDiv.querySelectorAll('*');
  allElements.forEach(el => {
    // Giữ lại một số attributes cần thiết
    const keepAttrs = ['src', 'alt', 'href', 'title'];
    const attrs = Array.from(el.attributes);
    attrs.forEach(attr => {
      if (!keepAttrs.includes(attr.name) && !attr.name.startsWith('data-original')) {
        el.removeAttribute(attr.name);
      }
    });

    // Xóa hết class
    if (el.classList.length > 0) {
      el.removeAttribute('class');
    }
  });

  // 3. XỬ LÝ ẢNH VÀ CAPTION TRƯỚC
  const images = tempDiv.querySelectorAll('img');
  images.forEach(img => {
    // Ưu tiên data-original nếu có
    const originalSrc = img.getAttribute('data-original');
    if (originalSrc) {
      img.setAttribute('src', originalSrc);
    }

    // Đảm bảo có alt text
    if (!img.getAttribute('alt')) {
      img.setAttribute('alt', 'Hình ảnh minh họa');
    }

    // Loại bỏ các thuộc tính không cần
    img.removeAttribute('data-original');
    img.removeAttribute('loading');
  });

  // 4. XỬ LÝ CAPTION - Xóa caption bị duplicate
  // Tìm các <p> có class img_chu_thich hoặc text giống với figcaption
  const paragraphs = Array.from(tempDiv.querySelectorAll('p'));
  const figcaptions = Array.from(tempDiv.querySelectorAll('figcaption'));

  paragraphs.forEach(p => {
    const text = p.textContent?.trim() || '';

    // Xóa nếu là caption duplicate
    const isDuplicateCaption = figcaptions.some(fig =>
      fig.textContent?.trim() === text
    );

    // Hoặc nếu đoạn này nằm ngay sau ảnh và có text giống alt
    const prevImg = p.previousElementSibling?.tagName === 'IMG' ? p.previousElementSibling : null;
    const isImageCaption = prevImg && prevImg.getAttribute('alt')?.includes(text.substring(0, 50));

    if (isDuplicateCaption || isImageCaption) {
      p.remove();
    }
  });

  // 5. PHÁT HIỆN VÀ TẠO HEADING TỰ ĐỘNG (chỉ từ đoạn văn content)
  const remainingParagraphs = tempDiv.querySelectorAll('p');
  let sectionCount = 0;
  const minParagraphsPerSection = 4; // Mỗi 4 đoạn = 1 section
  const maxSections = 4; // Tối đa 4 sections

  let paragraphIndex = 0;
  remainingParagraphs.forEach((p) => {
    const text = p.textContent?.trim() || '';

    // Bỏ qua đoạn quá ngắn hoặc quá dài
    if (text.length < 30 || text.length > 250) return;

    // Phát hiện đoạn có thể là tiêu đề
    const hasStrong = p.querySelector('strong') !== null;
    const hasCapitalStart = /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/.test(text);
    const isShort = text.length < 150;

    // Đây là heading rõ ràng
    const isObviousHeading = hasStrong && isShort && hasCapitalStart;

    // Hoặc là điểm chia section tự nhiên
    const isSectionBreak = paragraphIndex > 0 &&
                          paragraphIndex % minParagraphsPerSection === 0 &&
                          sectionCount < maxSections &&
                          hasCapitalStart;

    if (isObviousHeading || isSectionBreak) {
      const heading = document.createElement('h2');
      heading.textContent = text.length > 100 ? text.substring(0, 97) + '...' : text;

      // Thay thế nếu là heading rõ ràng
      if (isObviousHeading) {
        p.replaceWith(heading);
      } else if (isSectionBreak) {
        // Chèn heading trước đoạn
        p.parentNode?.insertBefore(heading, p);
      }

      sectionCount++;
    }

    paragraphIndex++;
  });

  // 6. CLEAN UP EMPTY ELEMENTS
  tempDiv.querySelectorAll('p, div, span, figcaption').forEach(el => {
    const text = el.textContent?.trim() || '';
    if (text.length === 0 && !el.querySelector('img')) {
      el.remove();
    }
  });

  // 7. XÓA CÁC ĐOẠN VĂN DUPLICATE (nếu có)
  const allParagraphs = Array.from(tempDiv.querySelectorAll('p'));
  const seenTexts = new Set<string>();

  allParagraphs.forEach(p => {
    const text = p.textContent?.trim() || '';
    if (seenTexts.has(text) && text.length > 20) {
      p.remove(); // Xóa đoạn duplicate
    } else {
      seenTexts.add(text);
    }
  });

  return tempDiv.innerHTML;
};

/**
 * Tách đoạn sapo từ content
 */
export const extractSapo = (html: string, maxLength: number = 300): string => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Tìm đoạn đầu tiên có strong hoặc h2 với class sapo
  const sapoElement = tempDiv.querySelector('h2.sum, h2[id*="sapo"], strong');
  if (sapoElement) {
    const text = sapoElement.textContent?.trim() || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  // Fallback: lấy đoạn văn đầu tiên
  const firstP = tempDiv.querySelector('p');
  if (firstP) {
    const text = firstP.textContent?.trim() || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  // Fallback cuối: lấy text thuần
  const allText = tempDiv.textContent?.trim() || '';
  return allText.length > maxLength ? allText.substring(0, maxLength) + '...' : allText;
};

export const cleanArticleContent = (
    rssArticle: Article , fullArticle?: ArticleDetail) => {
      const articleTitle : string = fullArticle?.title || rssArticle.title;
    
      // Lấy content gốc
      const rawContent = fullArticle?.content || `
        <p>${rssArticle.description}</p>
        ${rssArticle.image ? `<img src="${rssArticle.image}" alt="${rssArticle.title}" />` : ""}
      `;

      // Làm sạch HTML
      const articleContent = cleanHTMLContent(rawContent);

      // Extract sapo
      const articleSapo = fullArticle?.sapo || extractSapo(rawContent) || rssArticle.description.substring(0, 300);

      // Plain text cho tính toán thời gian đọc
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