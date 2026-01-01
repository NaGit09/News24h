import type { Comment } from "@/constant/comment";
import { selectAuthor } from "@/stores/comment.store";
import { Reply, ThumbsUp } from "lucide-react";
import { useDispatch } from "react-redux";

const CommentDisplay = (props: Comment) => {
  const { id, author, content, publishedAt, likes, replies, avatar } = props;
  const dispatch = useDispatch();
  const handleSelectReply = (author: string, id: string) => {
    console.log(author);
    dispatch(selectAuthor({ author, id }));
  };
  return (
    <div key={id} className="space-y-3">
      <div className="flex gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
          {avatar ? (
            <img
              src={avatar || "/placeholder.svg"}
              alt={author}
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-semibold text-muted-foreground">
              {author[0]}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{author}</span>
            <span className="text-xs text-muted-foreground">{publishedAt}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-foreground">
            {content}
          </p>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <button className="flex items-center gap-1 transition-colors hover:text-primary">
              <ThumbsUp className="h-3 w-3" />
              <span>{likes}</span>
            </button>
            <button
              onClick={() => handleSelectReply(author, id)}
              className="flex items-center gap-1 transition-colors hover:text-primary"
            >
              <Reply className="h-3 w-3" />
              <span>Trả lời</span>
            </button>
          </div>
        </div>
      </div>

      {/* Replies */}
      {replies && replies.length > 0 && (
        <div className="ml-12 space-y-3 border-l-2 border-border pl-4">
          {replies.map((reply) => (
            <div key={reply.id} className="flex gap-3">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted">
                <div className="flex h-full items-center justify-center text-xs font-semibold text-muted-foreground">
                  {reply.author[0]}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {reply.author}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {reply.publishedAt}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground">
                  {reply.content}
                </p>
                <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                  <button className="flex items-center gap-1 transition-colors hover:text-primary">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{reply.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentDisplay;
