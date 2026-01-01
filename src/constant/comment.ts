export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  publishedAt: string;
  likes: number;
  replies?: Comment[];
}

export const commentsData: Comment[] = [
    {
        id: "1",
        author: "Nguyễn Văn B",
        content:
            "Bài viết rất hữu ích, cảm ơn tác giả đã chia sẻ thông tin về thị trường vàng.",
        publishedAt: "2 giờ trước",
        likes: 12,
    },
    {
        id: "2",
        author: "Trần Thị C",
        content:
            "Giá vàng tăng quá nhanh, không biết có nên mua vào thời điểm này không?",
        publishedAt: "1 giờ trước",
        likes: 8,
        replies: [
            {
                id: "2-1",
                author: "Lê Văn D",
                content:
                    "Theo tôi thì nên đợi giá điều chỉnh một chút mới vào. Đừng mua đuổi đỉnh.",
                publishedAt: "45 phút trước",
                likes: 5,
            },
        ],
    },
    {
        id: "3",
        author: "Phạm Minh E",
        content:
            "Dự báo giá vàng sẽ còn tăng tiếp trong thời gian tới do tình hình kinh tế thế giới bất ổn.",
        publishedAt: "30 phút trước",
        likes: 15,
    },
]