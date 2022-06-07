export interface ItemI {
    item_id: string,
    cities: {
        city: string,
        qualities: {
            quality: number,
            sell_price_min: number,
            sell_price_min_date: string,
            sell_price_max: number,
            sell_price_max_date: string,
            buy_price_min: number,
            buy_price_min_date: string,
            buy_price_max: number,
            buy_price_max_date: string,
        }[]
    }[]
}