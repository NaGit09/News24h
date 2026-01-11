import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setGoldData,
    setCurrentDate,
    setBrand,
    setGoldDateAllBrand,
} from "@/stores/gold.store";
import {
    selectCurrentDate,
    selectBrand,
    selectBrands,
    selectGoldTableData,
    selectChartGoldData,
} from "@/stores/selector.store";
import { DateSample } from "@/constant/gold";
import type { GoldPrice } from "@/types/gold-price";

export function useGold({ skipInit = false }: { skipInit?: boolean } = {}) {
    const dispatch = useDispatch();
    const currentDate = useSelector(selectCurrentDate);
    const brand = useSelector(selectBrand);
    const brands = useSelector(selectBrands);
    const tableData = useSelector(selectGoldTableData);
    const chartData = useSelector(selectChartGoldData);

    useEffect(() => {
        if (skipInit) return;

        const normalizeDate = (dateStr: string) => {
            const [d, m, y] = dateStr.split("/");
            return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
        };

        const goldDataMap: Record<string, GoldPrice[]> = {};
        const goldDateSample = DateSample;

        Object.entries(goldDateSample).forEach(([brand, prices]) => {
            goldDataMap[brand] = prices.map((p: any) => ({
                ...p,
                date: normalizeDate(p.date),
            }));
        });

        dispatch(setGoldData(goldDataMap));
        dispatch(setGoldDateAllBrand(goldDataMap));

        // Handle initial brand
        if (goldDataMap["SJC"]) {
            dispatch(setBrand("SJC"));
        } else {
            dispatch(setBrand(Object.keys(goldDataMap)[0]));
        }
    }, [dispatch, skipInit]);

    const updateDate = useCallback(
        (date: string) => {
            dispatch(setCurrentDate(date));
        },
        [dispatch]
    );

    const updateBrand = useCallback(
        (brand: string) => {
            dispatch(setBrand(brand));
        },
        [dispatch]
    );

    return {
        currentDate,
        brand,
        brands,
        tableData,
        chartData,
        updateDate,
        updateBrand,
    };
}
