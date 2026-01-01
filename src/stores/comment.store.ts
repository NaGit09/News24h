import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Comment } from "@/constant/comment";

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  selectAuthor: string | null;
  replyId: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  selectAuthor: null,
  replyId: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
    reducers: {
    //   
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // 
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
        },
    // 
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
        },
    // 
    addComment(state, action: PayloadAction<Comment>) {
      if (state.selectAuthor && state.replyId) {
        const parentCommentIndex = state.comments.findIndex(
          (c) => c.id === state.replyId
        );
        if (parentCommentIndex !== -1) {
          if (!state.comments[parentCommentIndex].replies) {
            state.comments[parentCommentIndex].replies = [];
          }
          state.comments[parentCommentIndex].replies?.push(action.payload);
        } else {
          let found = false;
          for (const comment of state.comments) {
            if (comment.replies) {
              const replyIndex = comment.replies.findIndex(
                (r) => r.id === state.replyId
              );
              if (replyIndex !== -1) {
                comment.replies.push(action.payload);
                found = true;
                break;
              }
            }
          }
          if (!found) {
            state.comments = [action.payload, ...state.comments];
          }
        }
      } else {
        state.comments = [action.payload, ...state.comments];
      }
        },
    // 
    updateComment(state, action: PayloadAction<Comment>) {
      const index = state.comments.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
        },
    // 
    deleteComment(state, action: PayloadAction<string>) {
      state.comments = state.comments.filter((c) => c.id !== action.payload);
        },
    // 
    clearComments(state) {
      state.comments = [];
        },
    // 
    selectAuthor(state, action: PayloadAction<{ author: string; id: string }>) {
      state.selectAuthor = action.payload.author;
      state.replyId = action.payload.id;
        },
    // 
    clearSelectAuthor(state) {
      state.selectAuthor = null;
      state.replyId = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setComments,
  addComment,
  updateComment,
  deleteComment,
  clearComments,
  selectAuthor,
  clearSelectAuthor,
} = commentSlice.actions;

export default commentSlice.reducer;
