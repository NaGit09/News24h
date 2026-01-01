import type { Comment } from "@/constant/comment";
import { addComment, clearSelectAuthor } from "@/stores/comment.store";
import type { RootState } from "@/stores/root.store";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CommentForm = () => {
  const dispatch = useDispatch();

  const selectAuthor = useSelector(
    (state: RootState) => state.comment.selectAuthor
  );

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (selectAuthor) {
      setNewComment(`@${selectAuthor} `);
      inputRef.current?.focus();
    }
  }, [selectAuthor]);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    if (selectAuthor) {
      dispatch(clearSelectAuthor());
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Bạn",
      content: newComment,
      publishedAt: "Vừa xong",
      likes: 0,
    };

    dispatch(addComment(comment));
    setNewComment("");
  };
  return (
    <div className="mb-8">
      <textarea
        ref={inputRef}
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
  );
};

export default CommentForm;
