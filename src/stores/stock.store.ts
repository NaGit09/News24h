import { createSlice } from "@reduxjs/toolkit";
import type { StockData } from "../types/stock";

interface StockState {
  data: StockData[];
  loading: boolean;
  error: string | null;
  nextPage: string;
}
const initialState: StockState = {
  data: [],
  loading: false,
  error: null,
  nextPage: "",
};

export const stockStore = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setNextPage: (state, action) => {
      state.nextPage = action.payload;
    },
  },
});

export default stockStore.reducer;
