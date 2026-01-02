export interface GoldPrice {
    buy: number;
    sell: number;
    date: string;
}

export interface GoldDataResult {
    updateTime: string;
    unit: string;
    prices: GoldPrice[];
}

export interface GoldStoreProps {
    goldData: GoldPrice[];
    brand: string;
    currentDate: string;
}