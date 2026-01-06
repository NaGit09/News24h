export interface StockData {
    cash_amount: number;
    currency: string;
    dividend_type: string;
    ex_dividend_date: string;
    frequency: number;
    id: string;
    pay_date: string;
    record_date: string;
    ticker: string;
}

export interface StockResponse {
    results: StockData[];
    status: string;
    request_id: string;
    next_url: string;
}