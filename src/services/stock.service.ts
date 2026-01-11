import axios from "axios";
import { VITE_MASSIVE_KEY, VITE_MASSIVE_URL } from "../constant/base";
import type { StockResponse } from "../types/stock";

export const getStockData = async (): Promise<StockResponse> => {
  const response = await axios.get(`${VITE_MASSIVE_URL}=${VITE_MASSIVE_KEY}`);
  return response.data;
};

export const getNextPage = async (url: string): Promise<StockResponse> => {
  const response = await axios.get(url);
  return response.data;
};
