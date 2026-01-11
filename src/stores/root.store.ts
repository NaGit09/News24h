import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './article.store';
import commentReducer from './comment.store';
import goldReducer from './gold.store';
import stockReducer from './stock.store';
// register root store
export const store = configureStore({
    reducer: {
        article: articleReducer,
        comment: commentReducer,
        gold: goldReducer,
        stock: stockReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;