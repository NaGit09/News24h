import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getCategoriesNews from '@/news/Paser';
import type { Category } from '@/types/rss.type';

interface NewsState {
    feed: Category | null;
    loading: boolean;
    error: string | null;
}

const initialState: NewsState = {
    feed: null,
    loading: false,
    error: null,
};

export const fetchCategoriesNews = createAsyncThunk(
    'news/fetchCategoriesNews',
    async (category: string) => {
        const response = await getCategoriesNews(category);
        return response;
    }
);

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoriesNews.fulfilled, (state, action) => {
                state.loading = false;
                state.feed = action.payload;
            })
            .addCase(fetchCategoriesNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch news';
            });
    },
});

export default newsSlice.reducer;
