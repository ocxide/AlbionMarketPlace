import { ModifiedCity } from "./modified-city";

export interface Item { 
    item_id: string, 
    sell: ModifiedCity[], 
    buy: ModifiedCity[] 
  }