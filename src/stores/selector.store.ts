import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./root.store";
import type { GoldPrice } from "@/types/gold-price";
import { getYesterday } from "@/lib/helper";

export const selectGoldStore = (state: RootState) => state.gold;

export const selectGoldData = (state: RootState) => state.gold.goldData;

export const selectGoldDataAllBrand = (state: RootState) =>
  state.gold.goldDateAllBrand;

export const selectBrand = (state: RootState) => state.gold.brand;

export const selectCurrentDate = (state: RootState) => state.gold.currentDate;

export const selectBrands = createSelector([selectGoldData], (goldData) =>
  Object.keys(goldData)
);

export const selectChartGoldData = createSelector(
  [selectGoldData, selectBrand],
    (goldData, brand): GoldPrice[] => {
    return goldData[brand] ?? [];
  }
);

export const selectGoldTableData = createSelector(
  [selectGoldDataAllBrand, selectCurrentDate],
  (goldDateAllBrand, currentDate) => {
    const yesterday = getYesterday(currentDate);

    return Object.entries(goldDateAllBrand).map(([brand, prices]) => {
      const todayData = prices.find((p) => p.date === currentDate);

      const yesterdayData = prices.find((p) => p.date === yesterday);

      const diffBuy = (todayData?.buy ?? 0) - (yesterdayData?.buy ?? 0);

      const diffSell = (todayData?.sell ?? 0) - (yesterdayData?.sell ?? 0);

      return {
        brand,
        today: todayData,
        yesterday: yesterdayData,
        diffBuy,
        diffSell,
        isUp: diffBuy > 0,
      };
    });
  }
);
