import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Comment } from "@/constant/comment";

export interface CommentState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
    selectAuthor: string | null;
}

const initialState: CommentState = {
    comments: [],
    loading: false,
    error: null,
    selectAuthor: null,
};

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setComments(state, action: PayloadAction<Comment[]>) {
            state.comments = action.payload;
        },
        addComment(state, action: PayloadAction<Comment>) {
            state.comments = [action.payload, ...state.comments];
        },
        updateComment(state, action: PayloadAction<Comment>) {
            const index = state.comments.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.comments[index] = action.payload;
            }
        },
        deleteComment(state, action: PayloadAction<string>) {
            state.comments = state.comments.filter(c => c.id !== action.payload);
        },
        clearComments(state) {
            state.comments = [];
        },
        selectAuthor(state, action: PayloadAction<string>) {
            state.selectAuthor = action.payload;
        },
        clearSelectAuthor(state) {
            state.selectAuthor = null;
        }
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
    clearSelectAuthor
} = commentSlice.actions;

export default commentSlice.reducer;
