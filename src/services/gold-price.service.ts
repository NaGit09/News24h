import axiosInstance from "./api.service";
import * as cheerio from "cheerio";

const url = "/api/gia-vang-hom-nay-c425.html";

export interface ScrapedGoldItem {
  name: string;
  buyToday: string;
  sellToday: string;
  buyYesterday: string;
  sellYesterday: string;
  change: string;
}

export interface ScrapedGoldDataResult {
  updateTime: string;
  unit: string;
  prices: ScrapedGoldItem[];
}

export const getGoldenPrice = async (): Promise<ScrapedGoldDataResult | null> => {
  const html = await axiosInstance.get(url);
  const $ = cheerio.load(html.data);
  try {
    const prices: ScrapedGoldItem[] = [];

    const updateTime = $("header.cate-24h-gold-pri-top p.des em").text().trim();

    const unit = $(".cate-24h-gold-pri-table__note p:first-child em")
      .text()
      .trim();
    $(".gia-vang-search-data-table tbody tr").each((_, element) => {
      const row = $(element);
      const name = row.find("td:nth-child(1) h2").text().trim();
      const buyToday = row.find("td:nth-child(2) .fixW").text().trim();
      const change = row.find("td:nth-child(2) span:not(.fixW)").text().trim();
      const sellToday = row.find("td:nth-child(3) .fixW").text().trim();
      const buyYesterday = row.find("td:nth-child(4)").text().trim();
      const sellYesterday = row.find("td:nth-child(5)").text().trim();

      if (name) {
        prices.push({
          name,
          buyToday,
          sellToday,
          buyYesterday,
          sellYesterday,
          change: change || "0",
        });
      }
    });

    return {
      updateTime,
      unit,
      prices,
    };
  } catch (error) {
    console.error("Lỗi khi cào dữ liệu:", error);
    return null;
  }
};
