import { useState, useEffect } from 'react';
import { getFullArticle } from '@/services/rss';

interface ArticleData {
  title: string;
  sapo: string;
  content: string;
}

export function useArticle(articleUrl: string | undefined) {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleUrl) {
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFullArticle(articleUrl);
        
        if (data) {
          setArticle(data);
        } else {
          setError('Không thể tải nội dung bài viết');
        }
      } catch (err) {
        setError('Đã xảy ra lỗi khi tải bài viết');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleUrl]);

  return { article, loading, error };
}
