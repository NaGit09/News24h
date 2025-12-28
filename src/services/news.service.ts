import axiosInstance from "./api.service";

export const NewsApi = async (category: string): Promise<string> => {
  const response = await axiosInstance.get(`/api/rss/${category}.rss`);
  return response.data;
};
