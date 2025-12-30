/**
 * Chuyển đổi tên category thành slug URL-friendly
 */
export function getCategorySlug(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")  // Thay nhiều dấu gạch ngang liên tiếp thành 1
        .replace(/^-|-$/g, "") // Xóa dấu gạch ngang ở đầu và cuối
}

/**
 * Map slug URL về tên category gốc
 */
export const CATEGORY_SLUG_MAP: Record<string, string> = {
    "tin-tuc": "Tin tức",
    "bong-da": "Bóng đá",
    "kinh-doanh": "Kinh doanh",
    "giai-tri": "Giải trí",
    "24h-thich-bong-da-the-thao": "Thể thao",
    "suc-khoe": "Sức khỏe",
    "hi-tech": "Hi-tech",
    "the-gioi": "Thế giới",
    "the-thao": "Thể thao",
    "o-to": "Ô tô",
    "an-ninh": "An ninh",
    "thoi-trang": "Thời trang",
    "am-thuc": "Ẩm thực",
    "lam-dep": "Làm đẹp",
    "phim": "Phim",
    "giao-duc": "Giáo dục",
    "ban-tre": "Bạn trẻ",
    "ca-nhac": "Ca nhạc",
    "phi-thuong": "Phi thường",
    "cong-nghe": "Công nghệ",
    "thi-truong": "Thị trường",
    "du-lich": "Du lịch",
    "cuoi": "Cười",
    "asian-cup": "Asian Cup",
};

/**
 * Lấy tên category từ slug
 */
export function getCategoryName(slug: string): string | null {
    return CATEGORY_SLUG_MAP[slug] || null;
}
