import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { NewsState } from '@/types/news';
import { getCategoriesNews, getNewsDetail } from '@/lib/Paser';

const initialState: NewsState = {
    feed: null,
    loading: false,
    error: null,
    news: null,
};

export const fetchCategoriesNews = createAsyncThunk(
    'news/fetchCategoriesNews',
    async (category: string) => {
        const response = await getCategoriesNews(category);
        return response;
    }
);

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (news: string) => {
        const response = await getNewsDetail(news);
        return response;
    }
);

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
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
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch news';
            });
    },
});

export const { setLoading } = newsSlice.actions;

export default newsSlice.reducer;
