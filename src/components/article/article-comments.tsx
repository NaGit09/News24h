import {MessageSquare, Reply, ThumbsUp} from "lucide-react"
import {useState} from "react"

interface Comment {
    id: string
    author: string
    avatar?: string
    content: string
    publishedAt: string
    likes: number
    replies?: Comment[]
}

export function ArticleComments() {
    const [comments, setComments] = useState<Comment[]>([
        {
            id: "1",
            author: "Nguyễn Văn B",
            content: "Bài viết rất hữu ích, cảm ơn tác giả đã chia sẻ thông tin về thị trường vàng.",
            publishedAt: "2 giờ trước",
            likes: 12,
        },
        {
            id: "2",
            author: "Trần Thị C",
            content: "Giá vàng tăng quá nhanh, không biết có nên mua vào thời điểm này không?",
            publishedAt: "1 giờ trước",
            likes: 8,
            replies: [
                {
                    id: "2-1",
                    author: "Lê Văn D",
                    content: "Theo tôi thì nên đợi giá điều chỉnh một chút mới vào. Đừng mua đuổi đỉnh.",
                    publishedAt: "45 phút trước",
                    likes: 5,
                },
            ],
        },
        {
            id: "3",
            author: "Phạm Minh E",
            content: "Dự báo giá vàng sẽ còn tăng tiếp trong thời gian tới do tình hình kinh tế thế giới bất ổn.",
            publishedAt: "30 phút trước",
            likes: 15,
        },
    ])

    const [newComment, setNewComment] = useState("")
    const [replyTo, setReplyTo] = useState<string | null>(null)

    const handleSubmitComment = () => {
        if (!newComment.trim()) return

        const comment: Comment = {
            id: Date.now().toString(),
            author: "Bạn",
            content: newComment,
            publishedAt: "Vừa xong",
            likes: 0,
        }

        setComments([comment, ...comments])
        setNewComment("")
    }

    return (
        <div className="mt-12 border-t border-border pt-8">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
                <MessageSquare className="h-6 w-6"/>
                Bình luận ({comments.length})
            </h2>

            {/* Comment Form */}
            <div className="mb-8">
        <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            className="w-full rounded border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            rows={3}
        />
                <div className="mt-2 flex justify-end">
                    <button
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim()}
                        className="rounded bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Gửi bình luận
                    </button>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="space-y-3">
                        <div className="flex gap-3">
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                                {comment.avatar ? (
                                    <img
                                        src={comment.avatar || "/placeholder.svg"}
                                        alt={comment.author}
                                        className="object-cover"
                                    />
                                ) : (
                                    <div
                                        className="flex h-full items-center justify-center text-sm font-semibold text-muted-foreground">
                                        {comment.author[0]}
                                    </div>
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-foreground">{comment.author}</span>
                                    <span className="text-xs text-muted-foreground">{comment.publishedAt}</span>
                                </div>
                                <p className="mt-1 text-sm leading-relaxed text-foreground">{comment.content}</p>
                                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                                    <button className="flex items-center gap-1 transition-colors hover:text-primary">
                                        <ThumbsUp className="h-3 w-3"/>
                                        <span>{comment.likes}</span>
                                    </button>
                                    <button
                                        onClick={() => setReplyTo(comment.id)}
                                        className="flex items-center gap-1 transition-colors hover:text-primary"
                                    >
                                        <Reply className="h-3 w-3"/>
                                        <span>Trả lời</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-12 space-y-3 border-l-2 border-border pl-4">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex gap-3">
                                        <div
                                            className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted">
                                            <div
                                                className="flex h-full items-center justify-center text-xs font-semibold text-muted-foreground">
                                                {reply.author[0]}
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="text-sm font-semibold text-foreground">{reply.author}</span>
                                                <span
                                                    className="text-xs text-muted-foreground">{reply.publishedAt}</span>
                                            </div>
                                            <p className="mt-1 text-sm leading-relaxed text-foreground">{reply.content}</p>
                                            <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                                                <button
                                                    className="flex items-center gap-1 transition-colors hover:text-primary">
                                                    <ThumbsUp className="h-3 w-3"/>
                                                    <span>{reply.likes}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}


