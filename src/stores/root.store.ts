import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './article.store';
import commentReducer from './comment.store';

// register root store
export const store = configureStore({
    reducer: {
        article: articleReducer,
        comment: commentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;