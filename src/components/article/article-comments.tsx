import { commentsData } from "@/constant/comment";
import { MessageSquare } from "lucide-react";
import { useEffect } from "react";
import CommentDisplay from "../common/comment.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/stores/root.store";
import { setComments } from "@/stores/comment.store";
import CommentForm from "../common/comment-form.tsx";

export function ArticleComments() {
  const dispatch = useDispatch();

  const comments = useSelector((state: RootState) => state.comment.comments);

  useEffect(() => {
    if (comments.length === 0) {
      dispatch(setComments(commentsData));
    }
  }, [dispatch, comments.length]);

  return (
    <div  className="mt-12 border-t border-border pt-8">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
        <MessageSquare className="h-6 w-6" />
        Bình luận ({comments.length})
      </h2>
      <CommentForm />
      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentDisplay key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
}
