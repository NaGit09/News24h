import { useState, useEffect } from 'react';
import { fetchAllNews, fetchRSSFeed, type RSSArticle } from '@/services/rss';

export function useRSSFeeds() {
  const [articles, setArticles] = useState<RSSArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadFeeds() {
      try {
        setLoading(true);
        const data = await fetchAllNews();
        
        if (mounted) {
          setArticles(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadFeeds();

    // Refresh every 5 minutes
    const interval = setInterval(loadFeeds, 5 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { articles, loading, error };
}

export function useRSSByCategory(category: string) {
  const [articles, setArticles] = useState<RSSArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Map category name to RSS URL
  const categoryUrlMap: Record<string, string> = {
    "Tin tức": "/api/rss/tintuctrongngay.rss",
    "Bóng đá": "/api/rss/bongda.rss",
    "Asian Cup": "/api/rss/asiancup2019.rss",
    "An ninh": "/api/rss/anninhhinhsu.rss",
    "Thời trang": "/api/rss/thoitrang.rss",
    "Hi-tech": "/api/rss/thoitranghitech.rss",
    "Kinh doanh": "/api/rss/taichinhbatdongsan.rss",
    "Ẩm thực": "/api/rss/amthuc.rss",
    "Làm đẹp": "/api/rss/lamdep.rss",
    "Phim": "/api/rss/phim.rss",
    "Giáo dục": "/api/rss/giaoducduhoc.rss",
    "Bạn trẻ": "/api/rss/bantrecuocsong.rss",
    "Ca nhạc": "/api/rss/canhacmtv.rss",
    "Thể thao": "/api/rss/thethao.rss",
    "Phi thường": "/api/rss/phithuongkyquac.rss",
    "Công nghệ": "/api/rss/congnghethongtin.rss",
    "Ô tô": "/api/rss/oto.rss",
    "Thị trường": "/api/rss/thitruongtieudung.rss",
    "Du lịch": "/api/rss/dulich.rss",
    "Sức khỏe": "/api/rss/suckhoedoisong.rss",
    "Cười": "/api/rss/cuoi24h.rss",
  };

  const categoryUrl = categoryUrlMap[category];

  useEffect(() => {
    if (!categoryUrl) {
      setError(new Error(`Không tìm thấy category: ${category}`));
      setLoading(false);
      return;
    }

    let mounted = true;

    async function loadFeeds() {
      try {
        setLoading(true);
        const feed = await fetchRSSFeed(categoryUrl, category);
        
        if (mounted) {
          setArticles(feed?.articles || []);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadFeeds();

    // Refresh every 5 minutes
    const interval = setInterval(loadFeeds, 5 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [category, categoryUrl]);

  return { articles, loading, error };
}
